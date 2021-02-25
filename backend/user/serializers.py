from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    """
        to render User objects
    """
    class Meta:
        """
            to set what model and fields are used
        """
        model = User
        fields = '__all__'

    def to_representation(self, instance):
        """
            to set what data will be returned
        """
        data = super().to_representation(instance=instance)
        if instance.group:
            data['group'] = instance.group.name
        return data
