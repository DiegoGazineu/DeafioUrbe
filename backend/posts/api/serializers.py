from rest_framework import serializers
from ..models import Post, Favorites, FavoritesComponents

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'name', 'description', 'code')

class FavoritesComponentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoritesComponents
        fields = ('value', 'description', 'category')

class FavoriteSerializer(serializers.ModelSerializer):
    items = FavoritesComponentsSerializer(many=True, read_only=True) 

    class Meta:
        model = Favorites
        fields = ('code', 'items') 
