from rest_framework import viewsets
from ..models import Post, Favorites, FavoritesComponents
from .serializers import PostSerializer, FavoriteSerializer, FavoritesComponentsSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class FavoriteViewSet(viewsets.ModelViewSet):
    queryset = Favorites.objects.all()
    serializer_class = FavoriteSerializer

class FavoritesComponentsViewSet(viewsets.ModelViewSet):
    queryset = FavoritesComponents.objects.all()
    serializer_class = FavoritesComponentsSerializer