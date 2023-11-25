from django.db import models
from rest_framework.authtoken.admin import User


class Conversation(models.Model):
    initiator = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name="convo_starter"
    )
    receiver = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name="convo_participant"
    )
    start_time = models.DateTimeField(auto_now_add=True)


class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.SET_NULL,
                               null=True, related_name='message_sender')
    text = models.CharField(max_length=200, blank=True)
    conversation_id = models.ForeignKey(Conversation, on_delete=models.CASCADE,)
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ('-timestamp',)
