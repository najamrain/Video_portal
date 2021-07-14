from rest_framework.routers import DefaultRouter
from django.urls import path, include

from . import views as RecordingView

router = DefaultRouter()
router.register(r'recordings', RecordingView.RecordingViewSet)

urlpatterns = [
    path("", RecordingView.IndexView.as_view(), name="index"),
    path('api/', include(router.urls)),
    path('api/signin/', RecordingView.SignInView.as_view())
] 