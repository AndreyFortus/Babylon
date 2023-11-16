import urllib

from channels.middleware import BaseMiddleware
from channels.db import database_sync_to_async
from django.core.exceptions import PermissionDenied
from rest_framework.authtoken.models import Token
import logging

logger = logging.getLogger(__name__)


def get_token_from_scope(scope):
    query_string = scope.get('query_string', b'').decode('utf-8')
    query_params = urllib.parse.parse_qs(query_string)
    token_param = query_params.get('protocol', [None])[0]

    if token_param and token_param.startswith('Token '):
        return token_param[6:]

    return None


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
