from django.db import models


class Patient(models.Model):
    code = models.TextField(default='', unique=True)
    data = models.JSONField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created']
