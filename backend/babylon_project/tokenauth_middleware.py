from channels.middleware import BaseMiddleware
from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser
from rest_framework.authtoken.models import Token


def get_token_from_scope(scope):
    headers = dict(scope['headers'])
    authorization_header = headers.get(b'authorization').decode('utf-8')

    if authorization_header.startswith('Token '):
        return authorization_header[6:]

    return None


class TokenAuthMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        token_key = get_token_from_scope(scope)
        user = await self.get_user(token_key)
        scope['user'] = user

        return await super().__call__(scope, receive, send)

    @database_sync_to_async
    def get_user(self, token_key):
        if token_key:
            try:
                token = Token.objects.get(key=token_key)
                return token.user
            except Token.DoesNotExist:
                pass

        return AnonymousUser()
