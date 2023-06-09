from MatchIt.templates.api_class import MatchItAPIView
from users.utils.models.user import User
from rest_framework_simplejwt.tokens import RefreshToken
from users.utils.models.refresh_token import RefreshToken as TokenModel


class LoginView(MatchItAPIView):
    def post(self, request):
        # api/users/login
        # mobile_phone: string (required)
        # password: string (required)
        # TODO: limit login attempts
        # TODO: also limit refresh tokens to 3 per user

        req_data = ['mobile_phone', 'password']
        for data in req_data:
            if data not in request.data:
                return self.prepare_fail('{} is required'.format(data))

        mobile_phone = request.data['mobile_phone']
        password = request.data['password']

        if mobile_phone[0] == '+':
            mobile_phone = mobile_phone[1:]

        user = User.objects.filter(mobile_phone=mobile_phone).first()

        if user is None:
            return self.prepare_fail("Incorrect data")

        if not user.check_password(password):
            return self.prepare_fail("Incorrect data")

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        TokenModel.objects.create(token=str(refresh), user=user)

        return self.prepare_success({'user_id': user.id, 'access': access_token, 'refresh': str(refresh)})
