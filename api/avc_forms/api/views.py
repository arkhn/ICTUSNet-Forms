from avc_forms.api.models import Patient
from rest_framework import viewsets
from rest_framework import permissions
from avc_forms.api.serializers import PatientSerializer


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
