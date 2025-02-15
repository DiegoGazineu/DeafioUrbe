from rest_framework.routers import DefaultRouter
from posts.api.urls import post_router
from django.urls import path, include
from posts import views

router = DefaultRouter()

router.registry.extend(post_router.registry)

urlpatterns = [
    
    path('', include(router.urls)),
    path('scrap/', views.PageScramp.as_view()),
    path('favorite/', views.ScrampFavorite.as_view())
    
]
