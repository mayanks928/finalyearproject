from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ProcessedImage
from .serializers import ProcessedImageSerializer
from rest_framework.permissions import IsAuthenticated

class UploadImageView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = self.request.user
        input_image = request.FILES.get('input_image')

        # Your code for processing the input image with the deep learning model
        # Save the input and output images to the database

        processed_image = ProcessedImage.objects.create(
            user=user,
            task_name=self.request.data["taskName"],
            input_image=input_image,
            output_image=input_image  # replace with the processed image
        )

        return Response({"success": "Image uploaded and processed successfully"})

class GalleryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = self.request.user
        images = ProcessedImage.objects.filter(user=user)
        serializer = ProcessedImageSerializer(images, many=True)
        return Response(serializer.data)
