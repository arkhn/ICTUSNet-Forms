from django.db import models


class Patient(models.Model):
    code = models.TextField(default='', unique=True)
    data = models.JSONField()
    owner = models.ForeignKey('auth.User', related_name='patients', null=True, on_delete=models.SET_NULL)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created']
