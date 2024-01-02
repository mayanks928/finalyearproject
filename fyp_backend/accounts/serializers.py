from rest_framework import serializers
# from django.contrib.auth import get_user_model
from .models import UserAccount


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserAccount
        fields=['id','email','first_name','last_name']
        # fields='__all__'