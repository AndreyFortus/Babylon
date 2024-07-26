from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Tweet


class UserTweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name')


class TweetSerializer(serializers.ModelSerializer):
    user = UserTweetSerializer(read_only=True)
    created_at = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%S", read_only=True)

    class Meta:
        model = Tweet
        fields = ('id', 'user', 'content', 'created_at')

    def to_representation(self, instance):
        data = super().to_representation(instance)
        user_data = data.pop('user')
        data['user'] = f"{user_data['first_name']} ({user_data['username']})"
        return data
