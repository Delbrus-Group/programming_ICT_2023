from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models
from django.contrib.auth.models import BaseUserManager
from rest_framework_simplejwt.tokens import RefreshToken


class UserManager(BaseUserManager):
    def create_user(self, mobile_phone, password=None, **extra_fields):
        if not mobile_phone:
            raise ValueError("The mobile phone number must be provided")

        user = self.model(
            mobile_phone=mobile_phone,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    mobile_phone = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=128)
    btc_balance = models.FloatField(default=0)
    usdt_balance = models.FloatField(default=0)
    bnb_balance = models.FloatField(default=0)

    objects = UserManager()
    USERNAME_FIELD = 'mobile_phone'

    def __str__(self):
        return self.mobile_phone

    def logout(self):
        from users.utils.models.refresh_token import RefreshToken as TokenModel

        TokenModel.objects.filter(user=self).delete()
        # RefreshToken.for_user(self).blacklist()

    @staticmethod
    def validate_password(password):
        if len(password) < 6:
            return False

        return True

    @staticmethod
    def validate_phone_number(phone_number):
        if not (6 <= len(phone_number) <= 20):
            return False

        if phone_number.startswith('+'):
            phone_number = phone_number[1:]

        if not phone_number.isdigit():
            return False

        return True
