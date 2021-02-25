import uuid
from django.db import models
from group.models import Group


class User(models.Model):
    """
        This model represent  a User:
        Attributes:
            param id: Describes id of the User
            type id: uuid pk default=uuid4 editable=False
            param username: Describes username of the User
            type username: str max_length=50 unique
            param created: Describes creation date of the User
            type created: int(timestamp) auto_now_add=True
            param group: Describes Group of the User
            type group: foreign_key on_delete=PROTECT related_name=users blank null
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=50, unique=True)
    created = models.DateTimeField(auto_now_add=True)
    group = models.ForeignKey(Group, on_delete=models.PROTECT, related_name='users', blank=True, null=True)

    def __str__(self):
        """
            Magic method is redefined to show the main information about User
            :return: username
        """
        return self.username

    class Meta:
        """
        to set table name in database
        """

        db_table = 'user'
