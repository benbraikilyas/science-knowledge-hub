from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from backend_config.throttles import NewsletterThrottle
from .models import Subscriber


@api_view(['POST'])
@permission_classes([AllowAny])
@throttle_classes([NewsletterThrottle])
def subscribe(request):
    email = str(request.data.get('email', '')).strip().lower()
    try:
        validate_email(email)
    except ValidationError:
        return Response({'error': 'Please enter a valid email address.'}, status=status.HTTP_400_BAD_REQUEST)

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


@api_view(['POST'])
@permission_classes([AllowAny])
@throttle_classes([NewsletterThrottle])
def unsubscribe(request):
    email = str(request.data.get('email', '')).strip().lower()
    try:
        validate_email(email)
    except ValidationError:
        return Response({'error': 'Please enter a valid email address.'}, status=status.HTTP_400_BAD_REQUEST)

    subscriber = Subscriber.objects(email=email).first()
    if subscriber and subscriber.is_active:
        subscriber.is_active = False
        subscriber.save()

    # Use the same response whether or not the address exists to reduce email enumeration.
    return Response({'message': 'If this address was subscribed, it has now been unsubscribed.'})
