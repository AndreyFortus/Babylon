import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'babylon_project.settings')
django.setup()


from rest_framework import status
from rest_framework.test import APITestCase, APIRequestFactory
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from unittest.mock import patch

from .models import UserProfile

class UserDetailViewTest(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.token = Token.objects.create(user=self.user)
        self.api_authentication()

    def api_authentication(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.token.key}')

    def test_retrieve_user_detail(self):
        url = '/api/get-user-info/'
        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], self.user.username)

    def test_unauthenticated_access(self):
        self.client.credentials()

        url = '/api/get-user-info/'
        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class LevelUpdateAPIViewTest(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.token = Token.objects.create(user=self.user)
        self.api_authentication()

    def api_authentication(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.token.key}')

    def test_update_user_level(self):
        url = '/api/user-update-level/'

        self.assertIsNone(UserProfile.objects.filter(user=self.user).first())

        data = {'level': 2}
        response = self.client.patch(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        profile = UserProfile.objects.get(user=self.user)
        self.assertIsNotNone(profile)

        self.assertEqual(profile.level, data['level'])

    def test_invalid_data(self):
        url = '/api/user-update-level/'

        response = self.client.patch(url, {}, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_not_found(self):
        self.user.delete()
        self.token.delete()

        url = '/user-update-level/'

        data = {'level': 3}
        response = self.client.patch(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class GoogleAuthAPIViewTest(APITestCase):

    def setUp(self):
        self.factory = APIRequestFactory()

    @patch('accounts.views.requests.get')
    def test_google_auth_success(self, mock_requests_get):
        mock_requests_get.return_value.status_code = 200
        mock_requests_get.return_value.json.return_value = {
            'email': 'test@gmail.com',
            'given_name': 'John',
            'family_name': 'Doe',
            'picture': 'https://example.com/pic.jpg'
        }

        url = '/auth/google/'
        response = self.client.post(url, {'google_token': 'valid_google_token'}, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)

    @patch('accounts.views.requests.get')
    def test_google_auth_invalid_token(self, mock_requests_get):
        mock_requests_get.return_value.status_code = 400
        mock_requests_get.return_value.json.return_value = {'error': 'invalid_token'}

        url = '/auth/google/'
        response = self.client.post(url, {'google_token': 'invalid_google_token'}, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
