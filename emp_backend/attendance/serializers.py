from rest_framework import serializers
from attendance.models import Attendance
from account.models import User

class AttendanceSerializer(serializers.ModelSerializer):
    user = serializers.CharField()

    class Meta:
        model = Attendance
        fields = ['user', 'is_present', 'created_date']

    def validate_user(self, value):
        try:
            user = User.objects.get(email=value)
        except User.DoesNotExist:
            raise serializers.ValidationError("User with this email does not exist.")
        return user

    def create(self, validated_data):
        user = validated_data.pop('user')
        attendance = Attendance.objects.create(user=user, **validated_data)
        return attendance