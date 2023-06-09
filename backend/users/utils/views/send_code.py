from MatchIt.templates.api_class import MatchItAPIView
from users.utils.models.verification import Verification
from random import randint


class SendCodeView(MatchItAPIView):
    def post(self, request):
        # api/users/send_code
        # mobile_phone: string (required)
        # TODO: add limit of sending sms: 1 sms in 1 minute

        req_data = ['mobile_phone']
        for data in req_data:
            if data not in request.data:
                return self.prepare_fail('{} is required'.format(data))

        mobile_phone = request.data['mobile_phone']
        if mobile_phone[0] == '+':
            mobile_phone = mobile_phone[1:]

        if not mobile_phone.isdigit():
            return self.prepare_fail('mobile_phone is incorrect')

        code = randint(100000, 999999)
        print(code)
        Verification.objects.create(phone_number=mobile_phone, verification_code=code)

        return self.prepare_success({'status': 'success'})
