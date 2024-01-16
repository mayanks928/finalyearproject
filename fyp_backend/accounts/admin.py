from django.contrib import admin
from .models import UserAccount

class UserAccountAdmin(admin.ModelAdmin):
  list_display = ("id","email","first_name","is_superuser",)
# Register your models here.
admin.site.register(UserAccount,UserAccountAdmin)