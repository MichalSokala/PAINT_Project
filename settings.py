INSTALLED_APPS = [
    ...,
    'rest_framework',  # Django REST Framework
    'corsheaders',  # Obsługa CORS
    'api',  # Twoja aplikacja z modelem Task
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Middleware dla CORS
    ...,
]

# Pozwala na połączenia z Reacta uruchomionego na localhost:3000
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]
