from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ('email', 'first_name', 'last_name')
    
    def save(self, commit=True):
        user = super().save(commit=False)
        user.username = CustomUser.objects.generate_unique_username(user.first_name,user.last_name)
        if commit:
            user.save()
        return user

class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = CustomUser
        fields = ('email', 'first_name', 'last_name')

    def save(self, commit=True):
        user = super().save(commit=False)
        user.username = CustomUser.objects.generate_unique_username(user.first_name,user.last_name)
        if commit:
            user.save()
        return user