from rest_framework import serializers
from ..models import Favorites, FavoritesComponents

class FavoritesComponentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoritesComponents
        fields = ('value', 'description', 'category')

class FavoriteSerializer(serializers.ModelSerializer):
    items = FavoritesComponentsSerializer(many=True, read_only=True) 

    class Meta:
        model = Favorites
        fields = ('code', 'items') 
