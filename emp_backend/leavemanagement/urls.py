from django.urls import path
from leavemanagement.views import LeaveManagementSerializerView

urlpatterns = [
    path('createLeave/', LeaveManagementSerializerView.as_view(), name='createLeave'),
]