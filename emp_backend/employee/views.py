from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import EmployeeDetails
from .serializers import EmployeeDetailsSerializer
from django.shortcuts import get_object_or_404

class EmployeeDetailsListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        # Get employee details for the current logged-in user
        employee_details = EmployeeDetails.objects.filter(user=request.user)
        serializer = EmployeeDetailsSerializer(employee_details, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        # Create new employee details for the current logged-in user
        serializer = EmployeeDetailsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EmployeeDetailsDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, emp_id, user):
        # Retrieve an employee record by emp_id and ensure it belongs to the current user
        return get_object_or_404(EmployeeDetails, emp_id=emp_id, user=user)

    def get(self, request, emp_id, format=None):
        # Get details of a specific employee by emp_id for the current user
        employee_details = self.get_object(emp_id, request.user)
        serializer = EmployeeDetailsSerializer(employee_details)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, emp_id, format=None):
        # Update details of a specific employee by emp_id for the current user
        employee_details = self.get_object(emp_id, request.user)
        serializer = EmployeeDetailsSerializer(employee_details, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, emp_id, format=None):
        # Delete employee details for the current user
        employee_details = self.get_object(emp_id, request.user)
        employee_details.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class FetchEmployeeByIdView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, emp_id, format=None):
        # Fetch employee details by 4-digit emp_id
        if len(emp_id) == 4:
            employee_details = get_object_or_404(EmployeeDetails, emp_id=emp_id)
            serializer = EmployeeDetailsSerializer(employee_details)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"detail": "Invalid employee ID."}, status=status.HTTP_400_BAD_REQUEST)
