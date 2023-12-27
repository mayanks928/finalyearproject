from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.contrib import auth
from .serializers import UserSerializer
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from rest_framework import status

User = get_user_model()


@method_decorator(csrf_protect, name="dispatch")
class CheckAuthenticatedView(APIView):
    def get(self, request, format=None):
        try:
            isAuthenticated = request.user.is_authenticated

            if isAuthenticated:
                return Response({"isAuthenticated": "success"})
            else:
                return Response({"isAuthenticated": "error"})
        except:
            return Response(
                {"error": "Something went wrong while checking authentication status"}
            )


@method_decorator(csrf_protect, name="dispatch")
class SignUpView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data

        email = data["email"]
        firstName = data["firstName"]
        lastName = data["lastName"]
        password = data["password"]
        confirmPassword = data["confirmPassword"]

        try:
            validate_email(email)
        except ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        try:
            if password == confirmPassword:
                if User.objects.filter(email=email).exists():
                    return Response({"error": "Account with same email already exists"})
                else:
                    user = User.objects.create_user(
                        email=email,
                        password=password,
                        firstName=firstName,
                        lastName=lastName,
                    )
                    return Response({"success": "User created successfully"})

            else:
                return Response({"error": "Passwords do not match."})
        except:
            return Response({"error": "Something went wrong during sign-up"})


@method_decorator(csrf_protect, name="dispatch")
class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data

        email = data["email"]
        password = data["password"]

        try:
            user = auth.authenticate(email=email, password=password)

            if user is not None:
                auth.login(request, user)
                return Response({"success": "User authenticated", "email": email})
            else:
                return Response({"error": "Error Authenticating"})
        except:
            return Response({"error": "Something went wrong when logging in"})


class LogoutView(APIView):
    def post(self, request, format=None):
        try:
            auth.logout(request)
            return Response({"success": "Logged Out"})
        except:
            return Response({"error": "Something went wrong while logging out"})


@method_decorator(ensure_csrf_cookie, name="dispatch")
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        return Response({"success": "CSRF cookie set"})


class DeleteAccountView(APIView):
    def delete(self, request, format=None):
        user = self.request.user
        try:
            user = User.objects.filter(id=user.id).delete()
            return Response({"success": "User deleted successfully"})
        except:
            return Response(
                {"error": "Something went wrong while trying to delete user"}
            )


class GetUsersView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        users = User.objects.all()
        users = UserSerializer(users, many=True)
        return Response(users.data)
