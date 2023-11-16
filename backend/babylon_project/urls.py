from django.contrib import admin
from django.urls import path, include

from accounts.views import GoogleAuthAPIView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('lessons.urls')),
    path('api/', include('accounts.urls')),
    path('auth/google/', GoogleAuthAPIView.as_view(), name='google_auth'),
    path('api/', include('tweets.urls')),
    path('api/conversations/', include('chat.urls')),
]
