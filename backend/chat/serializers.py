from accounts.serializers import UserSerializer
from .models import Conversation, Message
from rest_framework import serializers


class MessageSerializer(serializers.ModelSerializer):
    exclude = ('conversation_id',)
    is_read = serializers.BooleanField(default=False)

    class Meta:
        model = Message
        exclude = ('conversation_id',)


class ConversationListSerializer(serializers.ModelSerializer):
    initiator = UserSerializer()
    receiver = UserSerializer()
    last_message = serializers.SerializerMethodField()

    class Meta:
        model = Conversation
        fields = ['conversation_id', 'initiator', 'receiver', 'last_message']
        extra_kwargs = {'conversation_id': {'source': 'id'}}

    def get_last_message(self, instance):
        message = instance.message_set.first()
        if message:
            data = MessageSerializer(instance=message).data
            data['is_read'] = message.is_read
            return data
        return None


class ConversationSerializer(serializers.ModelSerializer):
    initiator = UserSerializer()
    receiver = UserSerializer()
    message_set = MessageSerializer(many=True)

    class Meta:
        model = Conversation
        fields = ['conversation_id', 'initiator', 'receiver', 'message_set']
        extra_kwargs = {'conversation_id': {'source': 'id'}}
