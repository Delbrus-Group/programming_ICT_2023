from rest_framework.views import APIView
from rest_framework.response import Response


class MatchItAPIView(APIView):
    @staticmethod
    def prepare_fail(error):
        return Response({'error': error}, status=400)

    @staticmethod
    def prepare_success(data):
        data['error'] = ''
        return Response(data, status=200)
