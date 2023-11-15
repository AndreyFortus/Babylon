from django.db.models import Q
from rest_framework.authtoken.admin import User
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import Conversation
from .serializers import ConversationListSerializer, ConversationSerializer
from django.shortcuts import get_object_or_404
from rest_framework.response import Response

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def start_convo(request):
    username = request.user.username

    if not username:
        return Response({'message': 'Invalid request data'}, status=400)

    participant_username = request.data.get('username')

    if not participant_username:
        return Response({'message': 'Invalid request data'}, status=400)

    participant = get_object_or_404(User, username=participant_username)

    conversation = Conversation.objects.filter(Q(initiator=request.user, receiver=participant) |
                                               Q(initiator=participant, receiver=request.user)).first()

    if conversation:
        return Response({'conversation_id': conversation.id})
    else:
        conversation = Conversation.objects.create(initiator=request.user, receiver=participant)
        serializer = ConversationSerializer(instance=conversation, context={'request': request})
        return Response(serializer.data, status=201)

@api_view(['GET'])
def get_conversation(request, convo_id):
    conversation = Conversation.objects.filter(id=convo_id).first()
    if not conversation:
        return Response({'message': 'Conversation does not exist'}, status=404)

    serializer = ConversationSerializer(instance=conversation, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def conversations(request):
    authorization_header = request.headers.get('Authorization', '')
    try:
        token_key = authorization_header.split(' ')[1]
        token = Token.objects.get(key=token_key)
        user_id = token.user.id
    except (IndexError, Token.DoesNotExist):
        return Response({"error": "Invalid token"}, status=400)

    conversation_list = Conversation.objects.filter(Q(initiator_id=user_id) | Q(receiver_id=user_id))

    serializer = ConversationListSerializer(instance=conversation_list, context={'request': request}, many=True)
    return Response(serializer.data)
