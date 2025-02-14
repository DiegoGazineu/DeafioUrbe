from rest_framework.routers import DefaultRouter
from posts.api.urls import post_router
from django.urls import path, include
from posts.views import PageScramp  # Certifique-se de importar sua view PageScramp corretamente

router = DefaultRouter()

# Mesclando o post_router com o router principal
router.registry.extend(post_router.registry)

urlpatterns = [
    # Incluir as URLs dos posts
    path('', include(router.urls)),
    
    # URL para o scraping
    path('api/scrap/', PageScramp.as_view(), name='scrap_data'),  # Registrando o endpoint da view de scraping
]
