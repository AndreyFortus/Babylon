import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'babylon_project.settings')
django.setup()

import unittest
from unittest import mock
from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Tweet

class TweetTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)

    @mock.patch('tweets.models.Tweet.objects.create')
    def test_create_tweet(self, mock_create):
        mock_create.return_value = Tweet(content='Test tweet content', user=self.user)

        url = reverse('add-tweet')
        data = {'content': 'Test tweet content'}
        response = self.client.post(url, data, format='json')

        mock_create.assert_called_once_with(content='Test tweet content', user=self.user)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    @mock.patch('tweets.models.Tweet.objects.all')
    def test_list_tweets(self, mock_all):
        mock_all.return_value = [
            Tweet(content='Tweet 1', user=self.user),
            Tweet(content='Tweet 2', user=self.user),
        ]

        url = reverse('get-tweet-list')
        response = self.client.get(url)

        mock_all.assert_called_once()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]['content'], 'Tweet 1')
        self.assertEqual(response.data[1]['content'], 'Tweet 2')


if __name__ == '__main__':
    unittest.main()
