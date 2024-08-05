from django.db import models
from account.models import User

# Create your models here.

class Attendance(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    is_present = models.BooleanField(default=False)
    created_date = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.user.username