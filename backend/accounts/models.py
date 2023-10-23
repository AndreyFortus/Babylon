from django.contrib.auth.models import User
from django.db import models

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.CharField(max_length=255)
    level = models.IntegerField()

    def __str__(self):
        return self.user.username
