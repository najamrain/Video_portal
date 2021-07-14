from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from .models import Recording


class RecordingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Recording
        fields = ['id', 'video_file', 'video_blob_url']


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(allow_null=True, allow_blank=True)
    password = serializers.CharField(allow_null=True, allow_blank=True)

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user

        raise serializers.ValidationError("Incorrect Credentials")
