from django.urls import path
from .views import (
    EmployeeDetailsListView,
    EmployeeDetailsDetailView,
    FetchEmployeeByIdView
)

urlpatterns = [
    path('employees/', EmployeeDetailsListView.as_view(), name='employee-list'),
    path('employees/<int:emp_id>/', EmployeeDetailsDetailView.as_view(), name='employee-detail'),
    path('fetchEmployee/<str:emp_id>/', FetchEmployeeByIdView.as_view(), name='fetch-employee-by-id'),
]
