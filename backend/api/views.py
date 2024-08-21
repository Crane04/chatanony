from django.shortcuts import render
from rest_framework.generics import CreateAPIView, ListCreateAPIView
from .models import GroupChat, Messages
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
# Create your views here.

def home(request):
    return render(request, "index.html")

class CreateGroup(CreateAPIView):
    queryset = GroupChat.objects.all()
    serializer_class = GroupChatSerializer
    parser_classes = [MultiPartParser, FormParser]  # Added to handle image uploads

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            data_ = serializer.data
            if data_["image"] != None:
                data_["image"] = f"{request.scheme}://{str(request.get_host())+ data_['image']}"
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SendMessage(ListCreateAPIView):
    lookup_field = "group_id"
    queryset = Messages.objects.all()
    serializer_class = MessagesSerializer
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, group_id, *args, **kwargs):
        request.data._mutable = True  # Allow modification of request data
        serializer = self.serializer_class(data=request.data)

        if not GroupChat.objects.filter(group_id=group_id).exists():
            return Response({"details": "group chat not found"}, status=status.HTTP_404_NOT_FOUND)
        
        request.data["group"] = group_id

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, group_id, *args, **kwargs):
        if not GroupChat.objects.filter(group_id=group_id).exists():
            return Response({"details": "group chat not found"}, status=status.HTTP_404_NOT_FOUND)

        group = GroupChat.objects.get(group_id=group_id)
        group_serializer = GroupChatSerializer(group, context={'request': request})
        messages = Messages.objects.filter(group=group.pk)
        
        serializer = self.serializer_class(messages, many=True, context={'request': request})
        return Response({"data": serializer.data, "group_data": group_serializer.data})

class LastMessagesView(APIView):
    
    def post(self, request, *args, **kwargs):
        group_ids = request.data.get("group_ids", [])
        
        if not group_ids:
            return Response({
                "details": "group_ids are required"
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Retrieve the last message for each group
        results = []
        for group_id in group_ids:
            if GroupChat.objects.filter(group_id=group_id).exists():
                last_message = Messages.objects.filter(group__group_id=group_id).order_by('-time').first()
                if last_message:
                    serializer = LastMessageSerializer(last_message)
                    results.append(serializer.data)
                else:
                    group = GroupChat.objects.get(group_id=group_id)
                    results.append({
                        'group_id': group.group_id,
                        'group_name': group.name,
                        'message': None,
                        'time': None
                    })

        # Sort results by the message time, from most recent to oldest
        results = sorted(results, key=lambda x: x['time'], reverse=True)

        return Response(results, status=status.HTTP_200_OK)
