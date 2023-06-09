from django.core.exceptions import ValidationError

from MatchIt.templates.api_class import MatchItAPIView
from users.utils.models.user import User
from users.utils.models.verification import Verification
from rest_framework_simplejwt.tokens import RefreshToken
from users.utils.models.refresh_token import RefreshToken as TokenModel


def get_last_sms(phone_number):
    try:
        last_sms = Verification.objects.filter(phone_number=phone_number).latest('timestamp')
        return last_sms
    except Verification.DoesNotExist:
        return None


class CreateView(MatchItAPIView):
    def post(self, request):
        # api/users/create
        # mobile_phone: string (required)
        # password: string (required)
        # sms_code: string (required)

        req_data = ['mobile_phone', 'password', 'sms_code']
        for data in req_data:
            if data not in request.data:
                return self.prepare_fail('{} is required'.format(data))

        mobile_phone = request.data['mobile_phone']
        password = request.data['password']
        sms_code = request.data['sms_code']

        if User.validate_password(password) is False:
            return self.prepare_fail('Password is incorrect')

        if User.validate_phone_number(mobile_phone) is False:
            return self.prepare_fail('Phone number is incorrect')

        if Verification.validate_code(sms_code) is False:
            return self.prepare_fail('sms_code is incorrect')

        if mobile_phone[0] == '+':
            mobile_phone = mobile_phone[1:]

        if User.objects.filter(mobile_phone=mobile_phone).exists():
            return self.prepare_fail('User already exists')

        last_code = get_last_sms(mobile_phone)

        if last_code is None or last_code.is_used:
            return self.prepare_fail('sms_code is incorrect')


        if sms_code != last_code.verification_code:
            return self.prepare_fail('sms_code is incorrect')

        try:
            last_code.is_used = True
            last_code.save()
        except ValidationError:
            return self.prepare_fail('Failed to save the verification code')

        user = User.objects.create_user(
            mobile_phone=mobile_phone,
            password=password,
        )

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        TokenModel.objects.create(token=str(refresh), user=user)

        return self.prepare_success({'user_id': user.id, 'access': access_token, 'refresh': str(refresh)})
