import datetime
from django.utils import timezone
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from account.renderers import UserRenderer
from rest_framework.permissions import IsAuthenticated
from .serializers import AttendanceGetSerializer, AttendanceSerializer
# from account.views import get_tokens_for_user
from attendance.models import Attendance
# from django.utils.timezone import make_aware
from django.db.models.functions import TruncDate
from collections import OrderedDict

# Create your views here.

class AttendanceSerializerView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    
    def post(self, request, format=None):
        if not isinstance(request.data, list):
            return Response({'msg': 'Invalid data format, expected a list of records.'}, status=status.HTTP_400_BAD_REQUEST)

        for record in request.data:
            serializer = AttendanceSerializer(data=record)
            if serializer.is_valid():
                user = serializer.validated_data['user']
                today = timezone.now().date()
                
                if Attendance.objects.filter(user=user, created_date__date=today).exists():
                    attendance_record = Attendance.objects.filter(user=user, created_date__date=today).first()
                    attendance_record.is_present = record.get('is_present')
                    attendance_record.save()
                if not Attendance.objects.filter(user=user, created_date__date=today).exists():
                    serializer.save()
            else:
                Response({'errors': serializer.errors})

        return Response({'msg':'Attendance updated Successfully'}, status=status.HTTP_200_OK)
    
    def get(self, request):
        user = request.user
        
        attendances = Attendance.objects.filter(user=user).annotate(date_only=TruncDate('created_date')).order_by('date_only')
        
        unique_attendances = OrderedDict()
        for attendance in attendances:
            if attendance.date_only not in unique_attendances:
                unique_attendances[attendance.date_only] = attendance
                
        distinct_attendances = list(unique_attendances.values())
        
        serializer = AttendanceGetSerializer(distinct_attendances, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)