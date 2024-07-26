from django.urls import path
from .views import LevelUpdateAPIView, UserDetailView


urlpatterns = [
    path('users/<int:pk>/detail/', UserDetailView.as_view(), name='user-detail'),
    path('get-user-info/', UserDetailView.as_view(), name='get-user-info'),
    path('user-update-level/', LevelUpdateAPIView.as_view(), name='level-update'),
]
