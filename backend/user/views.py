from rest_framework.viewsets import ModelViewSet
from .models import User
from .serializers import UserSerializer


class UserViewSet(ModelViewSet):
    """
        ViewSet to work with POST, PUT, DELETE and GET requests
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
