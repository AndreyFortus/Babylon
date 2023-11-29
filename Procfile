web: gunicorn backend.babylon_project.wsgi
daphne: daphne -u /tmp/daphne.sock backend.babylon_project.asgi:application
redis: redis-server