from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _


class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """
    def create_user(self, email, password=None, first_name=None,last_name=None,username=None, **extra_fields):
        """
        Create and save a user with the given email and password.
        """
        if not email:
            raise ValueError(_("The Email must be set"))
        if not first_name:
            raise ValueError(_("The First Name must be set"))
        if not last_name:
            raise ValueError(_("The Last Name must be set"))
        
        email = self.normalize_email(email)
        # username = f'{first_name.lower()}_{last_name.lower()}'
        username = self.generate_unique_username(first_name, last_name)
        user = self.model(email=email, username=username, first_name=first_name, last_name=last_name,**extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError(_("Superuser must have is_staff=True."))
        if extra_fields.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))
        return self.create_user(email, password, **extra_fields)
    

    def generate_unique_username(self, first_name, last_name):
        base_username = f'{first_name.lower()}_{last_name.lower()}'
        username = base_username
        counter = 1

        while self.model.objects.filter(username=username).exists():
            username = f'{base_username}{counter}'
            counter += 1

        return username