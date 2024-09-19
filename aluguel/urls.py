from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClienteViewSet, ProdutoViewSet, AluguelViewSet

#router  padrão para gerenciamento das rotas de API
router = DefaultRouter()
router.register(r'clientes', ClienteViewSet)
router.register(r'produtos', ProdutoViewSet)
router.register(r'alugueis', AluguelViewSet)

# Definição das URLs que serão acessadas
urlpatterns = [
    path('', include(router.urls)),
]
