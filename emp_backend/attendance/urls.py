from django.urls import path

from attendance.views import AttendanceSerializerView

urlpatterns = [
    path('employe_attendance/add/', AttendanceSerializerView.as_view(), name='attendance'),

]