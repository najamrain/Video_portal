from datetime import datetime
from django.shortcuts import render
from django.views.generic import TemplateView
from django.http import HttpResponse
from rest_framework import generics, viewsets
from rest_framework.response import Response
from rest_framework import status
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect

from .models import Recording
from .serializer import LoginSerializer, RecordingSerializer


def index(request):
    return render(request, "build/index.html")

@method_decorator(csrf_protect, name='dispatch')
class IndexView(TemplateView):
    template_name = 'build/index.html'


class RecordingViewSet(viewsets.ModelViewSet):
    serializer_class = RecordingSerializer
    queryset = Recording.objects.all()



class SignInView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        return Response({
            "id": user.id,
            "username": user.username
        }, status=status.HTTP_200_OK)