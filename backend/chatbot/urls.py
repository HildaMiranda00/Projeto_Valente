from django.urls import path
from .views import *


urlpatterns = [
      path('api/chat', chat, name='chat'),
]
