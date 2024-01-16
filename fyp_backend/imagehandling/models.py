from django.db import models
from accounts.models import UserAccount  # Import your UserAccount model
import uuid

def input_image_path(instance, filename):
    # Define the path for the input image
    filename_parts = filename.split('.')
    new_filename = f"{instance.user.id}_{instance.generated_id}_{instance.task_name}_input.{filename_parts[-1]}"
    return f'input_images/{new_filename}'

def output_image_path(instance, filename):
    # Define the path for the output image
    filename_parts = filename.split('.')
    new_filename = f"{instance.user.id}_{instance.generated_id}_{instance.task_name}_output.{filename_parts[-1]}"
    return f'output_images/{new_filename}'

class ProcessedImage(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    generated_id=str(uuid.uuid4())
    input_image = models.ImageField(upload_to=input_image_path)
    output_image = models.ImageField(upload_to=output_image_path)
    task_name= models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {self.created_at}-{self.task_name}"
