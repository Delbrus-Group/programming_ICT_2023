from django.urls import path
from users.utils.views.login import LoginView
from users.utils.views.create import CreateView
from users.utils.views.refresh_token import TokenRefreshView
from users.utils.views.send_code import SendCodeView
from users.utils.views.update_password import UpdateView
from users.utils.views.get_balance import GetBalanceView
from users.utils.views.transfer import TransferView
from users.utils.views.get_transactions import GetTransactionsView

urlpatterns = [
    path('login', LoginView.as_view(), name='login'),
    path('create', CreateView.as_view(), name='create'),
    path('update_password', UpdateView.as_view(), name='update_password'),
    path('send_code', SendCodeView.as_view(), name='send_code'),
    path('token/refresh', TokenRefreshView.as_view(), name='refresh_token'),
    path('get_balance', GetBalanceView.as_view(), name='get_balance'),
    path('transfer', TransferView.as_view(), name='transfer'),
    path('get_transactions', GetTransactionsView.as_view(), name='get_transactions'),
]
