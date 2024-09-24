from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from notice import models
from .models import Notice
from .serializers import NoticeSerializer
from django.utils import timezone
from django.db.models import Case, When


class NoticeListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        is_active = request.query_params.get('is_active')
        if is_active == 'true':
            today = timezone.now().date()
            notices = Notice.objects.filter(start_date_lte=today, end_date_gte=today)
        else:
            notices = Notice.objects.all()
        
        serializer = NoticeSerializer(notices, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = NoticeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response({}, serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class NoticeDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Notice.objects.get(pk=pk)
        except Notice.DoesNotExist:
            return None

    def get(self, request, pk):
        """
        Retrieve a notice by ID.
        """
        notice = self.get_object(pk)
        if notice is not None:
            serializer = NoticeSerializer(notice)
            return Response(serializer.data)
        return Response({'error': 'Notice not found.'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        """
        Update an existing notice.
        """
        notice = self.get_object(pk)
        if notice is not None:
            serializer = NoticeSerializer(notice, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Notice not found.'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        """
        Delete a notice by ID.
        """
        notice = self.get_object(pk)
        if notice is not None:
            notice.delete()
            return Response({'message': 'Notice deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
        return Response({'error': 'Notice not found.'}, status=status.HTTP_404_NOT_FOUND)


class ActiveNoticeListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Return all active notices within their timeframe, arranged by priority (high to low).
        """
        today = timezone.now().date()
        notices = Notice.objects.filter(
            start_date__lte=today,
            end_date__gte=today
        ).annotate(
            priority_order=Case(
                When(notice_priority='high', then=1),
                When(notice_priority='medium', then=2),
                When(notice_priority='low', then=3),
                default=4,
                output_field=models.IntegerField(),
            )
        ).order_by('priority_order')  # Order by the annotated priority order

        serializer = NoticeSerializer(notices, many=True)
        return Response(serializer.data)