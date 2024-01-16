from django.contrib import admin
from .models import ProcessedImage

class ProcessedImageAdmin(admin.ModelAdmin):
    list_display = ('id','user', 'input_image', 'output_image', 'task_name', 'created_at',)

# Register your models here.
admin.site.register(ProcessedImage,ProcessedImageAdmin)
# admin.site.register(ProcessedImage)