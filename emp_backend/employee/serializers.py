from rest_framework import serializers
from .models import EmployeeDetails

class EmployeeDetailsSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = EmployeeDetails
        fields = ['name', 'emp_id', 'working_designation', 'user', 'salary', 'date_of_joining', 'department']  # Add other fields if needed

    def get_name(self, obj):
        return obj.user.username
