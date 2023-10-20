import random
import string
import requests
from django.contrib.auth.models import User  # Импортируйте модель User из правильного места

from .models import UserProfile
from .serializers import UserSerializer

from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all().order_by('-date_joined')
#     serializer_class = UserSerializer
#     # permission_classes = [permissions.IsAuthenticated]


class GoogleAuthAPIView(APIView):

    def generate_random_username(self, length=10):
        letters = string.ascii_lowercase
        return ''.join(random.choice(letters) for i in range(length))

    def verify_google_token(self, google_token):
        google_response = requests.get(f'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token={google_token}')
        return google_response.json()

    def get_google_email(self, access_token):
        google_response = requests.get('https://www.googleapis.com/oauth2/v1/userinfo',
                                       params={'access_token': access_token})

        if google_response.status_code == 200:
            data = google_response.json()
            email = data.get('email')
            return email
        return None

    def get_google_user_info(self, access_token):
        google_response = requests.get('https://www.googleapis.com/oauth2/v1/userinfo',
                                       params={'access_token': access_token})

        if google_response.status_code == 200:
            data = google_response.json()
            first_name = data.get('given_name')
            last_name = data.get('family_name')
            profile_picture = data.get('picture')
            return first_name, last_name, profile_picture
        return None, None

    def post(self, request, *args, **kwargs):
        # Get Google token from request
        google_token = request.data.get('google_token')

        # Validate Google token
        google_response = self.verify_google_token(google_token)
        if google_response.get('error'):
            return Response({'error': 'Invalid Google Token'}, status=status.HTTP_400_BAD_REQUEST)

        # Get email from Google token
        email = self.get_google_email(google_token)
        if not email:
            return Response({'error': 'Failed to retrieve email from Google'}, status=status.HTTP_400_BAD_REQUEST)

        username = self.generate_random_username()
        first_name, last_name, profile_picture = self.get_google_user_info(google_token)
        user = User.objects.filter(email=email).first()

        if not user:
            user = User.objects.create_user(username=username, email=email)
            user.first_name = first_name
            user.last_name = last_name
            user_profile = UserProfile.objects.create(user=user, profile_picture=profile_picture)
            user_profile.save()
            user.save()

        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=status.HTTP_200_OK)
