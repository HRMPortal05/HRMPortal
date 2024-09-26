from rest_framework import serializers
from account.models import User
from .models import EmployeeDetails

class EmployeeDetailsSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = EmployeeDetails
        fields = ['name', 'emp_id', 'working_designation', 'user', 'salary', 'date_of_joining', 'department']

    def get_name(self, obj):
        return obj.user.username

class EmployeeDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeeDetails
        fields = [
            'first_name', 'last_name', 'personal_mailid', 'working_designation', 
            'department', 'salary', 'phone_number', 'working_emailid', 
            'emp_id', 'date_of_birth', 'date_of_joining', 'address'
        ]

    def validate_working_emailid(self, value):
        # Check if a user with the given email exists
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("No user is registered with this working email.")
        return value