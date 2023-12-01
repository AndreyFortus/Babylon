import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'babylon_project.settings')
django.setup()

from unittest.mock import patch
from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient

from .models import Lesson, MultipleChoiceQuestion, FillBlankQuestion


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


class MultipleChoiceQuestionListViewTest(TestCase):
    def setUp(self):
        self.lesson = Lesson.objects.create(lesson_title='Test Lesson', hp=100)
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.token = Token.objects.create(user=self.user)
        self.client = APIClient()

        MultipleChoiceQuestion.objects.create(
            lesson=self.lesson,
            question='Test Question',
            correct_answer=2,
            option_one='Option 1',
            option_two='Option 2',
            option_three='Option 3',
            damage=10
        )

    @patch('lessons.views.check_user_level')
    def test_mcq_list_view_authenticated(self, mock_check_user_level):
        # Mocking the check_user_level function to always return True (for access)
        mock_check_user_level.return_value = True

        # Authenticate the user
        self.client.force_authenticate(user=self.user, token=self.token)

        # Make a request to the API endpoint
        response = self.client.get(f'/api/lesson/{self.lesson.pk}/questions/multiple-choice/')

        # Check for the expected status code
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertIn('question', response.data[0])
        self.assertIn('correct_answer', response.data[0])
        self.assertIn('option_one', response.data[0])
        self.assertIn('option_two', response.data[0])
        self.assertIn('option_three', response.data[0])
        self.assertIn('damage', response.data[0])

    @patch('lessons.views.check_user_level')
    def test_mcq_list_view_unauthenticated(self, mock_check_user_level):
        # Mocking the check_user_level function to always return True (for access)
        mock_check_user_level.return_value = True

        # Clear any existing credentials
        self.client.credentials()

        # Make a request to the API endpoint
        response = self.client.get(f'/api/lesson/{self.lesson.pk}/questions/multiple-choice/')

        # Check for the expected status code
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertGreaterEqual(len(response.data), 0)


class FillBlankQuestionListViewTest(TestCase):
    def setUp(self):
        self.lesson = Lesson.objects.create(lesson_title='Test Lesson', hp=100)
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.token = Token.objects.create(user=self.user)
        self.client = APIClient()

        FillBlankQuestion.objects.create(
            lesson=self.lesson,
            question='Test FillBlank Question',
            correct_answers_fill='Answer 1;Answer 2;Answer 3'
        )

    @patch('lessons.views.check_user_level')
    def test_fill_blank_list_view_authenticated(self, mock_check_user_level):
        # Mocking the check_user_level function to always return True (for access)
        mock_check_user_level.return_value = True

        # Authenticate the user
        self.client.force_authenticate(user=self.user, token=self.token)

        # Make a request to the API endpoint
        response = self.client.get(f'/api/lesson/{self.lesson.pk}/questions/fill-blank/')

        # Check for the expected status code
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertGreaterEqual(len(response.data), 1)
        self.assertIn('question', response.data[0])
        self.assertIn('correct_answers_fill', response.data[0])

    @patch('lessons.views.check_user_level')
    def test_fill_blank_list_view_unauthenticated(self, mock_check_user_level):
        # Mocking the check_user_level function to always return True (for access)
        mock_check_user_level.return_value = True

        # Clear any existing credentials
        self.client.credentials()

        # Make a request to the API endpoint
        response = self.client.get(f'/api/lesson/{self.lesson.pk}/questions/fill-blank/')

        # Check for the expected status code
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertGreaterEqual(len(response.data), 0)
