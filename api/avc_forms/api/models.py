from django.db import models

# Create your models here.

from django.contrib.postgres.fields import JSONField
from django.db import models


class Patient(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    data = JSONField()

    class Meta:
        ordering = ['created']
