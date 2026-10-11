from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.settings import api_settings
from rest_framework_simplejwt.tokens import RefreshToken
from backend_config.throttles import AuthThrottle
from .serializers import RegisterSerializer, UserProfileSerializer
from .models import User, UserProfile


def _tokens_for_user(user):
    refresh = RefreshToken()
    refresh[api_settings.USER_ID_CLAIM] = str(user.id)
    return {
        'access': str(refresh.access_token),
        'refresh': str(refresh),
        'user': {'id': str(user.id), 'username': user.username, 'email': user.email},
    }


def _get_or_create_profile(user_id):
    profile = UserProfile.objects(user_id=user_id).first()
    if not profile:
        profile = UserProfile(user_id=user_id)
        profile.save()
    return profile


@api_view(['POST'])
@permission_classes([AllowAny])
@throttle_classes([AuthThrottle])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response(
            {'message': 'User created successfully', **_tokens_for_user(user)},
            status=status.HTTP_201_CREATED,
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
@throttle_classes([AuthThrottle])
def login(request):
    identifier = request.data.get('username') or request.data.get('email')
    password = request.data.get('password')
    if not identifier or not password:
        return Response({'detail': 'username/email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects(username=identifier).first()
    if not user:
        user = User.objects(email=identifier).first()
    if not user or not user.check_password(password):
        return Response(
            {'detail': 'No active account found with the given credentials'},
            status=status.HTTP_401_UNAUTHORIZED,
        )
    if not user.is_active:
        return Response({'detail': 'User account is disabled'}, status=status.HTTP_401_UNAUTHORIZED)

    return Response(_tokens_for_user(user))


@api_view(['POST'])
@permission_classes([AllowAny])
@throttle_classes([AuthThrottle])
def refresh(request):
    token = request.data.get('refresh')
    if not token:
        return Response({'refresh': ['This field is required.']}, status=status.HTTP_400_BAD_REQUEST)
    try:
        refresh_token = RefreshToken(token)
        user_id = refresh_token.payload.get(api_settings.USER_ID_CLAIM)
        user = User.objects(id=user_id, is_active=True).first() if user_id else None
        if not user:
            raise TokenError('No active account found with the given credentials')
        return Response({'access': str(refresh_token.access_token)})
    except TokenError as e:
        return Response({'detail': str(e)}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET', 'PATCH'])
@permission_classes([IsAuthenticated])
def profile(request):
    profile = _get_or_create_profile(str(request.user.id))
    if request.method == 'GET':
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)
    data = request.data
    if 'displayName' in data:
        profile.display_name = data['displayName']
    if 'avatar' in data:
        profile.avatar = data['avatar']
    if 'bio' in data:
        profile.bio = data['bio']
    profile.save()
    serializer = UserProfileSerializer(profile)
    return Response(serializer.data)


@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def bookmarks(request):
    profile = _get_or_create_profile(str(request.user.id))
    if request.method == 'GET':
        return Response({'bookmarks': profile.bookmarks})
    article_id = request.data.get('articleId')
    if not article_id:
        return Response({'error': 'articleId required'}, status=400)
    if article_id in profile.bookmarks:
        profile.bookmarks.remove(article_id)
    else:
        profile.bookmarks.append(article_id)
    profile.save()
    return Response({'bookmarks': profile.bookmarks})


@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def reading_history(request):
    profile = _get_or_create_profile(str(request.user.id))
    if request.method == 'GET':
        return Response({'readingHistory': profile.reading_history})
    article_id = request.data.get('articleId')
    title = request.data.get('title', '')
    if article_id:
        history = [h for h in profile.reading_history if h.get('articleId') != article_id]
        from datetime import datetime, timezone
        history.insert(0, {'articleId': article_id, 'title': title, 'readAt': datetime.now(timezone.utc).isoformat()})
        profile.reading_history = history[:50]
        profile.save()
    return Response({'readingHistory': profile.reading_history})
