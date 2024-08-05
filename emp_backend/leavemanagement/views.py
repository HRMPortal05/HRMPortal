from django.utils import timezone
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from account.renderers import UserRenderer
from rest_framework.permissions import IsAuthenticated
from account.views import get_tokens_for_user
from leavemanagement.models import LeaveManagement
from leavemanagement.serializers import LeaveFetchSerializer, LeaveManagementSerializer

# Create your views here.

class LeaveManagementSerializerView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    
    def post(self, request, format=None):
        serializer = LeaveManagementSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'msg': 'Leave created successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'msg': 'There is something wrong for creating your Leave'}, status=status.HTTP_404_NOT_FOUND)
        
    def get(self, request, format=None):
        user = request.user
        leave = LeaveManagement.objects.filter(emp_details__user=user)
        serializer = LeaveFetchSerializer(leave, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)