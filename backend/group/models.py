import uuid
from django.db import models


class Group(models.Model):
    """
        This model represent  a User:
        Attributes:
            param id: Describes id of the Group
            type id: uuid pk default=uuid4 editable=False
            param name: Describes name of the Group
            type name: str max_length=50 unique
            param description: Describes description of the Group
            type description: str
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField()

    def __str__(self):
        """
            Magic method is redefined to show the main information about Group
            :return: name
        """
        return self.name

    class Meta:
        """
        to set table name in database
        """

        db_table = 'group'
