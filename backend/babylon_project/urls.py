from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from django.contrib.auth.views import LogoutView

from accounts.routers import accounts_router
from lessons.routers import lessons_router

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', TemplateView.as_view(template_name="test_home.html")),  # this url testing google auth
    path('accounts/', include('allauth.urls')),
    # path('logout', LogoutView.as_view()),  # this url testing google auth

    path('api/', include(accounts_router.urls)),
    path('api/', include(lessons_router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
