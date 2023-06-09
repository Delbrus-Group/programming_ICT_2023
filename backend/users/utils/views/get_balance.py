from MatchIt.templates.api_class import MatchItAPIView
from rest_framework.permissions import IsAuthenticated


class GetBalanceView(MatchItAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        # api/users/get_balance
        user = request.user

        btc_balance = user.btc_balance
        usdt_balance = user.usdt_balance
        bnb_balance = user.bnb_balance
        phone_number = user.mobile_phone

        return self.prepare_success({'btc_balance': btc_balance, 
                                     'bnb_balance': bnb_balance, 
                                     'usdt_balance': usdt_balance,
                                     'phone_number': phone_number})
