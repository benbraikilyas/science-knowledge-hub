from django.core.exceptions import ImproperlyConfigured
from rest_framework.throttling import AnonRateThrottle


class ConditionalThrottle(AnonRateThrottle):
    """Throttle that skips when the rate is not configured (e.g. in tests)."""

    def __init__(self):
        try:
            super().__init__()
        except ImproperlyConfigured:
            self.rate = None
            self.num_requests = None
            self.duration = None

    def allow_request(self, request, view):
        if not self.rate:
            return True
        return super().allow_request(request, view)


class LikeThrottle(ConditionalThrottle):
    scope = 'like'


class AuthThrottle(ConditionalThrottle):
    scope = 'auth'


class NewsletterThrottle(ConditionalThrottle):
    scope = 'newsletter'
