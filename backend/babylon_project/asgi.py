import os
from channels.routing import URLRouter, ProtocolTypeRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "babylon_project.settings")
django_asgi_app = get_asgi_application()

from chat.routing import websocket_urlpatterns  # must be here, under os.setdefault and django_asgi_app
from .tokenauth_middleware import TokenAuthMiddleware

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    'websocket': AllowedHostsOriginValidator(
        TokenAuthMiddleware(
            URLRouter(
                websocket_urlpatterns
            )
        )
    )
})

application.websocket_timeout = 60 * 1
