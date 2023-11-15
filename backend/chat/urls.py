from django.urls import path
from . import views

urlpatterns = [
    path('start/', views.start_convo, name='start-convo'),
    path('<int:convo_id>/', views.get_conversation, name='get-conversation'),
    path('', views.conversations, name='list-conversations')
]
