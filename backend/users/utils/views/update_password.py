from rest_framework.permissions import IsAuthenticated

from MatchIt.templates.api_class import MatchItAPIView
from users.utils.models.user import User


class UpdateView(MatchItAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        # api/users/create
        # current_password: string (required)
        # new_password: string (required)

        req_data = ['current_password', 'new_password']
        for data in req_data:
            if data not in request.data:
                return self.prepare_fail('{} is required'.format(data))

        current_password = request.data['current_password']
        new_password = request.data['new_password']

        if User.validate_password(new_password) is False:
            return self.prepare_fail('new_password is incorrect')

        user = request.user

        if not user.check_password(current_password):
            return self.prepare_fail("Incorrect password")

        user.set_password(new_password)
        user.save()
        user.logout()

        return self.prepare_success({'status': 'success'})
