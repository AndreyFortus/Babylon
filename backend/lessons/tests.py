import os
from unittest.mock import patch

import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'babylon_project.settings')
django.setup()

from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
from .models import Lesson

class LessonDetailViewTest(TestCase):
    def setUp(self):
        self.lesson = Lesson.objects.create(lesson_title='Test Lesson', hp=100)
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.token = Token.objects.create(user=self.user)
        self.client = APIClient()

    @patch('lessons.views.check_user_level')
    def test_lesson_detail_view_authenticated(self, mock_check_user_level):
        self.client.force_authenticate(user=self.user, token=self.token)

        response = self.client.get(f'/api/lesson/{self.lesson.pk}/')
        self.assertEqual(response.status_code, 200, f"Expected status code 200, but received {response.status_code}")

        lesson_data = response.data
        self.assertEqual(lesson_data.get('lesson_title'), 'Test Lesson', "Lesson title mismatch")

        lesson_data = response.data
        self.assertEqual(lesson_data['lesson_title'], 'Test Lesson')

    def test_lesson_detail_view_unauthenticated(self):
        self.client.credentials()  # Clear any existing credentials
        response = self.client.get(f'/api/lesson/{self.lesson.pk}/')
        self.assertEqual(response.status_code, 401)
