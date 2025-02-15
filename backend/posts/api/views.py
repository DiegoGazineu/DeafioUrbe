from rest_framework import viewsets
from ..models import Favorites, FavoritesComponents
from .serializers import  FavoriteSerializer, FavoritesComponentsSerializer

class FavoriteViewSet(viewsets.ModelViewSet):
    queryset = Favorites.objects.all()
    serializer_class = FavoriteSerializer

class FavoritesComponentsViewSet(viewsets.ModelViewSet):
    queryset = FavoritesComponents.objects.all()
    serializer_class = FavoritesComponentsSerializer