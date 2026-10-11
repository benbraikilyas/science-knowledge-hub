from django.core.exceptions import ValidationError as DjangoValidationError
from django.core.validators import validate_email
from mongoengine.errors import ValidationError as MongoValidationError
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from backend_config.throttles import ContactThrottle
from .models import ContactMessage


@api_view(['POST'])
@permission_classes([AllowAny])
@throttle_classes([ContactThrottle])
def create_message(request):
    # Quietly accept bot submissions that fill the hidden honeypot field.
    if str(request.data.get('website', '')).strip():
        return Response({'message': 'Message received'}, status=status.HTTP_201_CREATED)

    name = str(request.data.get('name', '')).strip()
    email = str(request.data.get('email', '')).strip().lower()
    subject = str(request.data.get('subject', '')).strip()
    message = str(request.data.get('message', '')).strip()
    privacy_accepted = request.data.get('privacyAccepted') in (True, 'true', 'True', '1', 1)

    if len(name) < 2 or len(name) > 120:
        return Response({'error': 'Please enter a valid name.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        validate_email(email)
    except DjangoValidationError:
        return Response({'error': 'Please enter a valid email address.'}, status=status.HTTP_400_BAD_REQUEST)

    if subject not in ContactMessage.SUBJECTS:
        return Response({'error': 'Please select a valid subject.'}, status=status.HTTP_400_BAD_REQUEST)

    if len(message) < 10 or len(message) > 5000:
        return Response({'error': 'The message must be between 10 and 5,000 characters.'}, status=status.HTTP_400_BAD_REQUEST)

    if not privacy_accepted:
        return Response({'error': 'Please accept the privacy notice.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        ContactMessage(name=name, email=email, subject=subject, message=message).save()
    except MongoValidationError:
        return Response({'error': 'Please check the submitted information.'}, status=status.HTTP_400_BAD_REQUEST)

    return Response({'message': 'Message received'}, status=status.HTTP_201_CREATED)
