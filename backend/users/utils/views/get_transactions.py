from MatchIt.templates.api_class import MatchItAPIView
from rest_framework.permissions import IsAuthenticated
from users.utils.models.transaction import Transaction
import pytz


class GetTransactionsView(MatchItAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        # api/users/get_transactions
        user = request.user

        income_transactions = Transaction.objects.filter(user_to=user)
        outcome_transaction = Transaction.objects.filter(user_from=user)

        transactions = []

        for i in outcome_transaction:
            transactions.append({
                'timestamp': i.timestamp,
                'user_from': i.user_from.mobile_phone,
                'user_to': i.user_to.mobile_phone,
                'count': -i.count,
                'ticker': i.ticker,
                'outcome': True
            })

        for i in income_transactions:
            transactions.append({'timestamp': i.timestamp,
                                 'user_from': i.user_from.mobile_phone,
                                 'user_to': i.user_to.mobile_phone,
                                 'count': i.count,
                                 'ticker': i.ticker,
                                 'outcome': False})

        transactions.sort(key=lambda x : x['timestamp'], reverse=True)

        return self.prepare_success({'transactions': transactions})
