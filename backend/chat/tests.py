import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'babylon_project.settings')
django.setup()

from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from django.urls import reverse

from .models import Conversation, Message

User = get_user_model()

class StartConvoTestCase(APITestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(username='user1', password='testpass1')
        self.user2 = User.objects.create_user(username='user2', password='testpass2')

    def test_start_convo_success(self):
        self.client.force_authenticate(user=self.user1)

        data = {'username': 'user2'}
        response = self.client.post(reverse('start-convo'), data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('conversation_id', response.data)

    def test_start_convo_invalid_request_data(self):
        self.client.force_authenticate(user=self.user1)

        data = {}  # Invalid request data
        response = self.client.post(reverse('start-convo'), data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('message', response.data)

    def test_start_convo_already_existing_conversation(self):
        self.client.force_authenticate(user=self.user1)

        # Create a conversation between user1 and user2
        Conversation.objects.create(initiator=self.user1, receiver=self.user2)

        data = {'username': 'user2'}
        response = self.client.post(reverse('start-convo'), data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('conversation_id', response.data)


class GetConversationTestCase(APITestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(username='user1', password='testpass1')
        self.user2 = User.objects.create_user(username='user2', password='testpass2')

    def test_get_conversation_success(self):
        # Create a conversation between user1 and user2
        conversation = Conversation.objects.create(initiator=self.user1, receiver=self.user2)
        message = Message.objects.create(sender=self.user1, text='Hello', conversation_id=conversation)
        conversation.last_message = message
        conversation.save()

        self.client.force_authenticate(user=self.user1)

        response = self.client.get(reverse('get-conversation', args=[conversation.id]))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        print(response.data)
        self.assertIn('initiator', response.data)
        self.assertIn('receiver', response.data)
        self.assertIn('message_set', response.data)

        self.assertIn('is_read', response.data['message_set'][0])
        self.assertIn('text', response.data['message_set'][0])
        self.assertIn('timestamp', response.data['message_set'][0])
        self.assertIn('sender', response.data['message_set'][0])

    def test_get_conversation_not_found(self):
        self.client.force_authenticate(user=self.user1)

        response = self.client.get(reverse('get-conversation', args=[999]))  # Non-existent conversation ID

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn('message', response.data)


class ConversationsTestCase(APITestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(username='user1', password='testpass1')
        self.user2 = User.objects.create_user(username='user2', password='testpass2')
        self.token = Token.objects.create(user=self.user1)

        # Create a conversation between user1 and user2
        self.conversation = Conversation.objects.create(initiator=self.user1, receiver=self.user2)
        self.message = Message.objects.create(sender=self.user1, text='Hello', conversation_id=self.conversation)

    def test_conversations_list(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        response = self.client.get(reverse('list-conversations'))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, list)

    def test_conversations_invalid_request_data(self):
        self.client.force_authenticate(user=self.user1)

        data = {}
        response = self.client.post(reverse('list-conversations'), data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)
