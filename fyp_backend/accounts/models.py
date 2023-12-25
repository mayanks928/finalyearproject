from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager


class UserAccountManager(BaseUserManager):
    def create_user(self,email,first_name,last_name,password=None):
        if not email:
            raise ValueError("Users must have an email address")
        
        email=self.normalize_email(email)
        user = self.model(email=email, first_name=first_name,last_name=last_name)

        user.set_password(password)
        user.save()

        return user
    def create_superuser(self, email, first_name, last_name, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, first_name, last_name, password, **extra_fields)


# Create your models here.
class UserAccount(AbstractBaseUser):
    email=models.EmailField(max_length=255,unique=True)
    first_name=models.CharField(max_length=50)
    last_name=models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects= UserAccountManager()

    USERNAME_FIELD='email'
    REQUIRED_FIELDS=['first_name','last_name']

    def get_full_name(self):
        return self.first_name+" "+self.last_name
    def get_first_name(self):
        return self.first_name
    def get_last_name(self):
        return self.last_name
    def __str__(self):
        return self.email