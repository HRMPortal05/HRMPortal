from django.db import models
from account.models import User
from django.utils import timezone

class Attendance(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    is_present = models.BooleanField(default=False)
    created_date = models.DateTimeField(default=timezone.now)  # Editable with default current time

    def __str__(self):
        return self.user.username