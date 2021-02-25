from rest_framework import serializers
from .models import Group


class GroupSerializer(serializers.ModelSerializer):
    """
        to render Group objects
    """
    class Meta:
        """
            to set what model and fields are used
        """
        model = Group
        fields = '__all__'
