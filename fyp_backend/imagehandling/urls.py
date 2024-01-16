from django.urls import path
from .views import UploadImageView,GalleryView
urlpatterns = [
    path('image_process',UploadImageView.as_view()),
    path('user_gallery',GalleryView.as_view()),
]