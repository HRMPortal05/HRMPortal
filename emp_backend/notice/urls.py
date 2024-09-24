from django.urls import path
from .views import NoticeListCreateView, NoticeDetailView, ActiveNoticeListView

urlpatterns = [
    path('notices/', NoticeListCreateView.as_view(), name='notice-list-create'),
    path('notices/<uuid:pk>/', NoticeDetailView.as_view(), name='notice-detail'),	
    path('notices/active/', ActiveNoticeListView.as_view(), name='active-notice-list'),
]