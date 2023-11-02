from django.urls import path
from .views import TweetCreateView, TweetListView

urlpatterns = [
    path('tweets/add', TweetCreateView.as_view(), name='add-tweet'),
    path('tweets/list', TweetListView.as_view(), name='get-tweet-list'),
]
