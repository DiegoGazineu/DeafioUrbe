from django.db import models


class Favorites(models.Model):
    code = models.CharField(max_length=10, unique=True)

class FavoritesComponents(models.Model):
    favorites = models.ForeignKey(Favorites, related_name="items", on_delete=models.CASCADE)
    value = models.CharField(max_length=18)
    description = models.CharField(max_length=40)
    category = models.CharField(max_length=18)


