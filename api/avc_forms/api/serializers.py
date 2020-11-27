from django.contrib.auth.models import User
from avc_forms.api.models import Patient
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email']


class PatientSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Patient
        fields = [
            'url',
            'code',
            'data',
            'last_updated_by',
            'last_updated_at',
            'created_by',
            'created_at'
        ]
        extra_kwargs = {
            'last_updated_by': {'read_only': True},
            'last_updated_at': {'read_only': True},
            'created_by': {'read_only': True},
            'created_at': {'read_only': True},
        }
