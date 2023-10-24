import random
import requests
import string

from django.contrib.auth.models import User  # Import right User model
from rest_framework import viewsets, generics, status, permissions
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import UserProfile
from .serializers import UserSerializer, UserProfileSerializer


class UserDetailView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_object(self):
        return self.request.user


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
        return None, None, None

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


class LevelUpdateAPIView(generics.UpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_object(self):
        user = self.request.user
        if user is not None:
            profile, created = UserProfile.objects.get_or_create(user=user)
            return profile
        return None

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance is not None:
            level = request.data.get('level')
            if level is not None:
                instance.level = level
                instance.save()
                return Response({'level': instance.level}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
