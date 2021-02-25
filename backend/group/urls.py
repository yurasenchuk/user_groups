from rest_framework.routers import DefaultRouter
from .views import GroupViewSet

router = DefaultRouter()
router.register('', GroupViewSet)
urlpatterns = router.urls
