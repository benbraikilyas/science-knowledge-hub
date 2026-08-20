from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from backend_config.throttles import NewsletterThrottle
from .models import Subscriber


@api_view(['POST'])
@permission_classes([AllowAny])
@throttle_classes([NewsletterThrottle])
def subscribe(request):
    email = request.data.get('email')
    if not email:
        return Response({'error': 'email is required'}, status=status.HTTP_400_BAD_REQUEST)

    existing = Subscriber.objects(email=email).first()
    if existing:
        if existing.is_active:
            return Response({'message': 'Already subscribed'})
        existing.is_active = True
        existing.save()
        return Response({'message': 'Re-subscribed successfully'})

    subscriber = Subscriber(email=email)
    subscriber.save()
    return Response({'message': 'Subscribed successfully'}, status=status.HTTP_201_CREATED)
