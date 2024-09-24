from django.contrib import admin
from attendance.models import Attendance

# Register your models here.

class AttendanceAdmin(admin.ModelAdmin):
    list_display = ('user', 'is_present', 'created_date')

admin.site.register(Attendance, AttendanceAdmin)