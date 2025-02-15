from rest_framework import serializers
from ..models import Post, Favorites, FavoritesComponents

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'name', 'description', 'code')

class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorites
        fields = ('code')

class FavoritesComponentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoritesComponents
        fields = ('favorites', 'value', 'description', 'category')
