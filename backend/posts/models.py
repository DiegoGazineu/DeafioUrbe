from django.db import models
import uuid

class Post(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    code = models.CharField(blank=True, max_length=12)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.name)
    
    def save(self, *args, **kwargs):
        if not self.code:
            self.code = str(uuid.uuid4()).replace("-","").upper()[:12]
        super().save(*args, **kwargs)

class Favorites(models.Model):
    code = models.CharField(max_length=10, unique=True)

class FavoritesComponents(models.Model):
    favorites = models.ForeignKey(Favorites, related_name="items", on_delete=models.CASCADE)
    value = models.CharField(max_length=18)
    description = models.CharField(max_length=40)
    category = models.CharField(max_length=18)


