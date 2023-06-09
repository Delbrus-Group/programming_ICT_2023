from rest_framework_simplejwt.exceptions import TokenError

from MatchIt.templates.api_class import MatchItAPIView
from rest_framework_simplejwt.tokens import RefreshToken
from users.utils.models.refresh_token import RefreshToken as TokenModel


class TokenRefreshView(MatchItAPIView):
    # permission_classes = (IsAuthenticated,)

    def post(self, request):
        # api/users/token/refresh
        # refresh: string (required)

        refresh_token = request.data.get('refresh')

        try:
            TokenModel.objects.get(token=refresh_token)
            refresh = RefreshToken(refresh_token)

            access_token = str(refresh.access_token)
            return self.prepare_success({'access': access_token})
        except TokenModel.DoesNotExist:
            return self.prepare_fail("Invalid token")
        except TokenError:
            return self.prepare_fail("Invalid token")
