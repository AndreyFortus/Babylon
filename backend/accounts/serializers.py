from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('profile_picture',)

class UserSerializer(serializers.HyperlinkedModelSerializer):
    profile_picture = serializers.CharField(source='userprofile.profile_picture')

    class Meta:
        model = User
        fields = ['url', 'id', 'username', 'email', 'first_name', 'last_name', 'profile_picture']


