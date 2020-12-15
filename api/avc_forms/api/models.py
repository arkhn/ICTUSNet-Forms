from django.db import models
import uuid


class Patient(models.Model):
    code = models.TextField(default=uuid.uuid4, unique=True)
    data = models.JSONField()
    created_by = models.ForeignKey('auth.User', related_name='+', on_delete=models.RESTRICT)
    created_at = models.DateTimeField(auto_now_add=True)
    last_updated_by = models.ForeignKey('auth.User', related_name='+', on_delete=models.RESTRICT)
    last_updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created_at']
