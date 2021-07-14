# from django.db import models
from djongo import models

# Create your models here.

class Recording(models.Model):
    video_file = models.FileField(upload_to="recordings/", null=True, blank=True)
    video_blob_url = models.CharField(max_length=1000, null=True, blank=True)

