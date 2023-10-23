from django.contrib import admin
from django.urls import path, include

from accounts.routers import accounts_router
from lessons.routers import lessons_router

from accounts.views import GoogleAuthAPIView, LevelUpdateAPIView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(accounts_router.urls)),
    path('api/', include(lessons_router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('auth/google/', GoogleAuthAPIView.as_view(), name='google_auth'),
    path('api/users/<int:pk>/update-level/', LevelUpdateAPIView.as_view(), name='level-update'),
]
