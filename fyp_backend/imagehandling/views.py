from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ProcessedImage
from .serializers import ProcessedImageSerializer
from rest_framework.permissions import IsAuthenticated
from django.core.files.base import ContentFile
import requests
from django.views.decorators.http import require_http_methods

import base64
from io import BytesIO
from PIL import Image

# Server url here. Uncomment the below line after setting url
# FAST_API_URL = "https://b728-34-168-171-247.ngrok-free.app"


def apply_mask_to_image(input_image, mask_data_url):
    # Load the input image
    input_image = Image.open(input_image)

    # Decode the Data URL to get the mask image
    _, encoded_data = mask_data_url.split(",", 1)
    decoded_data = base64.b64decode(encoded_data)
    mask_image = Image.open(BytesIO(decoded_data))

    # Resize the mask image to match the size of the input image
    input_image = input_image.resize((256,256))
    mask_image = mask_image.resize((256,256))

    # Apply the mask to the input image
    result_image = Image.alpha_composite(input_image.convert("RGBA"), mask_image.convert("RGBA"))

    # Convert the result back to RGB if needed
    result_image = result_image.convert("RGB")

     # Save the result to a BytesIO buffer
    result_buffer = BytesIO()
    result_image.save(result_buffer, format="PNG")  # Adjust format as needed

    # Get the bytes-like object from the buffer
    result_bytes = result_buffer.getvalue()

    return result_bytes

    return result_image

class UploadImageView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = self.request.user
        input_image = request.FILES.get("input_image")
        print(type(input_image))
        task=self.request.data["taskName"]
        # if task=="Colorization":
        #     deg_type="colorization"
        if task=="Restoration":
            task_var="restoration"
            api_endpoint="image_restoration"
        elif task=="Inpainting":
            task_var="inpainting"
            api_endpoint="image_inpainting"
            # If inpainting included in frontend
            # image_mask=self.request.data["imageMask"]
            # input_image=apply_mask_to_image(input_image,image_mask)
            # print(type(input_image))

        # Save the input and output images to the database
        # Send a POST request to FastAPI to process the input image
        try:
            response = requests.post(
                f"{FAST_API_URL}/{api_endpoint}",
                files={"image": input_image},
                # data={
                #     "degradation_type": deg_type,
                #     "task":deg_type,
                #     "degradation_scale": "0.0",
                #     "sigma": "0.0",
                # },
            )
            response.raise_for_status()
        except requests.exceptions.RequestException as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        # Assuming the FastAPI response is successful, proceed to get degraded and restored images
        try:
            degraded_image_response = requests.get(f"{FAST_API_URL}/get_image_input",params={"task": task_var})
            degraded_image_response.raise_for_status()

            restored_image_response = requests.get(f"{FAST_API_URL}/get_image_output",params={"task": task_var})
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


class DeleteImageView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, image_id, *args, **kwargs):
        try:
            image = ProcessedImage.objects.get(id=image_id, user=request.user)
        except ProcessedImage.DoesNotExist:
            return Response({"detail": "Image not found"}, status=status.HTTP_404_NOT_FOUND)

        image.delete()
        return Response({"detail": "Image deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
