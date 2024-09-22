from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils.timezone import now
from rest_framework import status
from attendance.models import Attendance
from account.renderers import UserRenderer
from dashboard.serializers import TodayTaskSerializer
from dashboard.models import TodayTasks
from employee.models import EmployeeDetails
from django.utils import timezone

class AttendanceCountAPIView(APIView):
    permission_classes = [IsAuthenticated]
    renderer_classes = [UserRenderer]
    
    def get(self, request, *args, **kwargs):
        # Get the current user
        user = request.user
        
        # Get the current date
        current_date = now()

        # Filter attendance records for the current user and the current month
        attendance_records = Attendance.objects.filter(
            user=user,
            created_date__year=current_date.year,
            created_date__month=current_date.month
        )
        
        # Count the number of days the user was present
        present_count = attendance_records.filter(is_present=True).count()
        
        # Count the total days (either present or absent) in the current month
        total_days = attendance_records.count()

        data = {
            'total_days': total_days,
            'present_days': present_count,
        }
        
        return Response(data, status=status.HTTP_200_OK)

class TodayTaskAPIView(APIView):
    permission_classes = [IsAuthenticated]
    renderer_classes = [UserRenderer]

    def get(self, request):
        user = request.user
        
        employee = EmployeeDetails.objects.filter(user=user).first()
        
        if not employee:
            return Response({'error': 'Employee details not found for the current user.'}, status=status.HTTP_404_NOT_FOUND)
        
        today = timezone.now().date()
        tasks = TodayTasks.objects.filter(employee=employee, created_date=today)

        task_data = [
            {
                'task_description': task.task_description,
                'task_status': task.task_status,
            }
            for task in tasks
        ]
        
        data = {
            'tasks': task_data
        }
        
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        user = request.user
        
        employee = EmployeeDetails.objects.filter(user=user).first()
        
        if not employee:
            return Response({'error': 'Employee details not found for the current user.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = TodayTaskSerializer(data=request.data)

        if serializer.is_valid():
            task = serializer.save(employee=employee)
            return Response({
                'message': 'Your task added successfully',
                'task': TodayTaskSerializer(task).data
            }, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)