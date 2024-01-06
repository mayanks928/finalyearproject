from django.db import models
from accounts.models import UserAccount  # Import your UserAccount model

class ProcessedImage(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    input_image = models.ImageField(upload_to='input_images/')
    output_image = models.ImageField(upload_to='output_images/')
    task_name= models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {self.created_at}-{self.task_name}"
