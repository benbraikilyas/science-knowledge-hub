from django.http import JsonResponse
from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None:
        return response

    try:
        from pymongo.errors import PyMongoError
        if isinstance(exc, PyMongoError):
            return JsonResponse(
                {
                    'error': 'Database error',
                    'detail': f'{exc}',
                },
                status=503,
            )
    except ImportError:
        pass

    return JsonResponse(
        {
            'error': 'Internal server error',
            'detail': f'{type(exc).__name__}: {exc}',
        },
        status=500,
    )
