from MatchIt.templates.api_class import MatchItAPIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from users.utils.models.transaction import Transaction

User = get_user_model()


class TransferView(MatchItAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        # api/users/create
        # mobile_phone: string (required)
        # count: float (required)
        # ticker: string (required): btc, usdt or bnb

        req_data = ['mobile_phone', 'count', 'ticker']
        for data in req_data:
            if data not in request.data:
                return self.prepare_fail('{} is required'.format(data))

        mobile_phone = request.data['mobile_phone']
        count = float(request.data['count'])
        ticker = request.data['ticker']

        if count <= 0:
            return self.prepare_fail('Incorrect count')

        if ticker not in ['btc', 'usdt', 'bnb']:
            return self.prepare_fail('Incorrect ticker')

        if mobile_phone[0] == '+':
            mobile_phone = mobile_phone[1:]

        toUser = User.objects.filter(mobile_phone=mobile_phone).first()
        user = request.user

        if toUser is None or user.id == toUser.id:
            return self.prepare_fail('Incorrect mobile_phone')

        if ticker == 'btc':
            if user.btc_balance < count:
                return self.prepare_fail('Not enough money')

            user.btc_balance -= count
            user.save()

            toUser.btc_balance += count
            toUser.save()
        elif ticker == 'bnb':
            if user.bnb_balance < count:
                return self.prepare_fail('Not enough money')

            user.bnb_balance -= count
            user.save()

            toUser.bnb_balance += count
            toUser.save()
        else: 
            if user.usdt_balance < count:
                return self.prepare_fail('Not enough money')

            user.usdt_balance -= count
            user.save()

            toUser.usdt_balance += count
            toUser.save()

        Transaction.objects.create(user_from=user, 
                                   user_to=toUser,
                                   count=count,
                                   ticker=ticker)

        return self.prepare_success({'status': 'success'})
