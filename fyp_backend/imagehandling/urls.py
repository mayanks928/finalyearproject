from django.urls import path
from .views import UploadImageView,GalleryView,DeleteImageView
urlpatterns = [
    path('image_process',UploadImageView.as_view()),
    path('user_gallery',GalleryView.as_view()),
    path('image_delete/<int:image_id>',DeleteImageView.as_view()),
]