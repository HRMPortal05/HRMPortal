from rest_framework import serializers
from account.models import User
from employee.models import EmployeeDetails
from leavemanagement.models import LeaveManagement

class LeaveManagementSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(write_only=True)
    
    class Meta:
        model = LeaveManagement
        fields = ['email', 'leave_type', 'from_date', 'to_date', 'reason', 'status', 'pending_work_of_employee']
        
    def validate_email(self, value):
        try:
            emp_details = EmployeeDetails.objects.get(user__email=value)
        except EmployeeDetails.DoesNotExist:
            raise serializers.ValidationError("Employee with this email does not exist.")
        return emp_details

    def create(self, validated_data):
        emp_details = validated_data.pop('email')
        leave_management = LeaveManagement.objects.create(emp_details=emp_details, **validated_data)
        return leave_management
    
class LeaveFetchSerializer(serializers.ModelSerializer):
    is_admin = serializers.SerializerMethodField()

    class Meta:
        model = LeaveManagement
        fields = ['emp_details', 'leave_type', 'from_date', 'to_date', 'reason', 'status', 'pending_work_of_employee', 'is_admin']

    def get_is_admin(self, obj):
        return obj.emp_details.user.is_admin