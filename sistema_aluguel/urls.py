#rotas para aplicação aluguel.

from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponseRedirect

# Inclui as rotas do app aluguel nas rotas principais do projeto
urlpatterns = [
    path('admin/', admin.site.urls),  
    path('api/', include('aluguel.urls')),  # Rota para a API
    path('', lambda request: HttpResponseRedirect('/api/')), ## coloquei pra ser responsivo na api criada
]
