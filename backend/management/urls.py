from django.urls import path
from .views import *

app_name = 'management'
urlpatterns = [
      path('create_event/', create_event, name='create_event'),
]
