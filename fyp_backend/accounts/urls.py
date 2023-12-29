from django.urls import path
from .views import SignUpView,LoginView,LogoutView,DeleteAccountView,GetUsersView

urlpatterns = [
    path('login',LoginView.as_view()),
    path('logout',LogoutView.as_view()),
    path('register',SignUpView.as_view()),
    path('delete',DeleteAccountView.as_view()),
    path('get_users',GetUsersView.as_view()),
]