from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ProcessedImage
from .serializers import ProcessedImageSerializer
from rest_framework.permissions import IsAuthenticated
from django.core.files.base import ContentFile
import requests

FAST_API_URL = "https://d7f0-35-234-16-130.ngrok-free.app"


class UploadImageView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = self.request.user
        input_image = request.FILES.get("input_image")
        task=self.request.data["taskName"]
        if task=="Colorization":
            deg_type="colorization"
        elif task=="Inpainting":
            deg_type="inpainting"
        # Your code for processing the input image with the deep learning model
        # Save the input and output images to the database
        # Send a POST request to FastAPI to process the input image
        try:
            response = requests.post(
                f"{FAST_API_URL}/image_test",
                files={"image": input_image},
                data={
                    "degradation_type": deg_type,
                    "degradation_scale": "0.0",
                    "sigma": "0.0",
                },
            )
            response.raise_for_status()
        except requests.exceptions.RequestException as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        # Assuming the FastAPI response is successful, proceed to get degraded and restored images
        try:
            degraded_image_response = requests.get(f"{FAST_API_URL}/get_image_degraded")
            degraded_image_response.raise_for_status()

            restored_image_response = requests.get(f"{FAST_API_URL}/get_image_restored")
            restored_image_response.raise_for_status()
        except requests.exceptions.RequestException as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        # Save the processed images to the database
        degraded_image_contentfile=ContentFile(degraded_image_response.content,f"degraded_image.png")
        restored_image_contentfile=ContentFile(restored_image_response.content,f"restored_image.png")
        processed_image = ProcessedImage.objects.create(
            user=user,
            task_name=task,
            input_image=degraded_image_contentfile,
            output_image=restored_image_contentfile,
        )

        return Response(
            {"success": "Image uploaded, processed, and saved successfully",
            #  "image_res":degraded_image_response,
            #  "image_type":type(input_image)
             }
        )


class GalleryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = self.request.user
        images = ProcessedImage.objects.filter(user=user)
        serializer = ProcessedImageSerializer(images, many=True)
        return Response(serializer.data)
