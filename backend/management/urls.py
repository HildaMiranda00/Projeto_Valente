from django.urls import path
from . import views

urlpatterns = [
      path(route='create_event/', view=views.create_event, name='create_event'),
      path(route='register_user/', view=views.register_user, name='register_user'),
      path(route='login/', view=views.login_view, name='login'),
      path(route='event_list/', view=views.event_list, name='event_list'),
]

