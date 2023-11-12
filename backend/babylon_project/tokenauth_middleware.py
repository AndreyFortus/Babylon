import urllib

from channels.middleware import BaseMiddleware
from channels.db import database_sync_to_async
from django.core.exceptions import PermissionDenied
from rest_framework.authtoken.models import Token
import logging

# def get_token_from_scope(scope):
#     headers = dict(scope['headers'])
#     authorization_header = headers.get(b'authorization').decode('utf-8')
#
#     if authorization_header.startswith('Token '):
#         return authorization_header[6:]
#
#     return None
logger = logging.getLogger(__name__)

def get_token_from_scope(scope):
    query_string = scope.get('query_string', b'').decode('utf-8')
    query_params = urllib.parse.parse_qs(query_string)
    token_param = query_params.get('protocol', [None])[0]

    if token_param and token_param.startswith('Token '):
        return token_param[6:]

    return None

# def get_token_from_scope(scope):
#     query_string = scope.get("query_string", b"").decode("utf-8")
#     token_param = "protocol=Token "
#
#     if token_param in query_string:
#         start_index = query_string.find(token_param) + len(token_param)
#         end_index = query_string.find("&", start_index)
#         token = query_string[start_index:end_index] if end_index != -1 else query_string[start_index:]
#         return token
#
#     return None



class TokenAuthMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        token_key = get_token_from_scope(scope)
        user = await self.get_user(token_key)
        if user is None:
            logger.warning(f"Token authentication failed for key: {token_key}")
            return PermissionDenied()
        scope['user'] = user

        return await super().__call__(scope, receive, send)

    @database_sync_to_async
    def get_user(self, token_key):
        if token_key:
            try:
                token = Token.objects.get(key=token_key)
                return token.user
            except Token.DoesNotExist:
                return None
