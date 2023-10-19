from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

from accounts.routers import accounts_router
from lessons.routers import lessons_router

from accounts.views import GoogleAuthAPIView

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('accounts/', include('allauth.urls')),
    path('api/', include(accounts_router.urls)),
    path('api/', include(lessons_router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('auth/google/', GoogleAuthAPIView.as_view(), name='google_auth'),
]
