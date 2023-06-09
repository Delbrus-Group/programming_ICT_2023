from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Transaction(models.Model):
    user_from = models.ForeignKey(User, on_delete=models.CASCADE,
                                  related_name='user_from')
    user_to = models.ForeignKey(User, on_delete=models.CASCADE,
                                  related_name='user_to')
    count = models.FloatField(default=0)
    ticker = models.CharField(max_length=6)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"User from: {self.user_from.id}\n" \
               f"User to: {self.user_to.id}"
