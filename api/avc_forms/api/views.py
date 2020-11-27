from django.contrib.auth.models import User
from avc_forms.api.models import Patient
from rest_framework import viewsets
from rest_framework import permissions
from avc_forms.api.serializers import UserSerializer, PatientSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class PatientViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows patients to be viewed or edited.
    """
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [permissions.DjangoModelPermissions]

    def perform_create(self, serializer):
        serializer.save(
            created_by=self.request.user,
            last_updated_by=self.request.user
        )

    def perform_update(self, serializer):
        serializer.save(last_updated_by=self.request.user)
