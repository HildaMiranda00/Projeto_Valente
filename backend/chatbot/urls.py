from django.urls import path
from . import views


urlpatterns = [
      path(route='chat', view=views.chat, name='chat'),
]

