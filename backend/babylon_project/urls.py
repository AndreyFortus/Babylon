from django.contrib import admin
from django.urls import path, include

# from accounts.routers import accounts_router
from lessons.routers import lessons_router
from accounts.views import GoogleAuthAPIView, LevelUpdateAPIView
from accounts.views import UserDetailView

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/', include(accounts_router.urls)),
    path('api/', include(lessons_router.urls)),

    # without this next link don't work
    path('api/users/<int:pk>/detail/', UserDetailView.as_view(), name='user-detail'),

    path('api/get-user-info/', UserDetailView.as_view(), name='get-user-info'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('auth/google/', GoogleAuthAPIView.as_view(), name='google_auth'),
    path('api/user-update-level/', LevelUpdateAPIView.as_view(), name='level-update'),
]
