from django.urls import path
from .views import *


urlpatterns = [
    path("", home),
    path("create-group", CreateGroup.as_view(), name="create room"),
    path("messages/<str:group_id>", SendMessage.as_view(), name = "messages"),
    path("lastmessages", LastMessagesView.as_view(), name = "lastmessages")
]

