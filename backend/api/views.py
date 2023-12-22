from django.shortcuts import render
from rest_framework.generics import CreateAPIView, ListCreateAPIView
from .models import GroupChat, Messages
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
import uuid, re
from rest_framework.parsers import MultiPartParser, FormParser
# Create your views here.

def home(request):
    return render(request, "index.html")

class CreateGroup(CreateAPIView):
    queryset = GroupChat
    serializer_class = GroupChatSerializer

    def post(self, request, *args, **kwargs):

        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data, status =  status.HTTP_201_CREATED
            )
        return Response(
            serializer.errors, status = status.HTTP_400_BAD_REQUEST
        )
    

class SendMessage(ListCreateAPIView):
    lookup_field = "group_id"
    queryset = Messages
    serializer_class = MessagesSerializer
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request,group_id, *args, **kwargs):
        request.data._mutable = True
        serializer = self.serializer_class(data=request.data) #To avoid This QueryDict instance is immutable error
        if GroupChat.objects.filter(group_id = group_id).exists() == False:
            return Response({
                "details": "group chat not found"
            }, status = status.HTTP_404_NOT_FOUND)
        
        request.data["group"] = group_id
        
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data, status =  status.HTTP_201_CREATED
            )
        return Response(
            serializer.errors, status = status.HTTP_400_BAD_REQUEST
        )
    
    def get(self, request, group_id,  *args, **kwargs):

        if GroupChat.objects.filter(group_id = group_id).exists() == False:
            return Response({
                "details": "group chat not found"
            }, status = status.HTTP_404_NOT_FOUND)
        
        group = GroupChat.objects.get(group_id = group_id)
        group_serializer = GroupChatSerializer(group)
        messages = Messages.objects.filter(group = group.pk)
        
        serializer = self.serializer_class(messages, many =  True,  context={'request': request})
        return Response(
            {"data":serializer.data,
            "group_data": group_serializer.data
            }
        )
