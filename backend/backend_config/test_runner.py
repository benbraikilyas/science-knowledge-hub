"""Custom test runner that skips SQL database operations (MongoDB only)."""
from django.test.runner import DiscoverRunner


class MongoTestRunner(DiscoverRunner):
    def setup_databases(self, **kwargs):
        return None

    def teardown_databases(self, old_config, **kwargs):
        pass
