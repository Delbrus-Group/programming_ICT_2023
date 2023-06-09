from django.db import models


class Verification(models.Model):
    phone_number = models.CharField(max_length=20)
    verification_code = models.CharField(max_length=6)
    timestamp = models.DateTimeField(auto_now_add=True)
    is_used = models.BooleanField(default=False)

    def __str__(self):
        return f"Phone Number: {self.phone_number}, " \
               f"Verification Code: {self.verification_code}, " \
               f"Timestamp: {self.timestamp} " \
               f"Is Used: {self.is_used}"

    @staticmethod
    def validate_code(code):
        if len(code) != 6 or not code.isdigit():
            return False

        return True
