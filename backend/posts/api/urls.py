from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, FavoriteViewSet, FavoritesComponentsViewSet

post_router = DefaultRouter()
post_router.register(r'posts', PostViewSet)
post_router.register(r'favorites', FavoriteViewSet)
post_router.register(r'favorites_components', FavoritesComponentsViewSet)
