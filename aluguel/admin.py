from django.contrib import admin
from .models import Cliente, Produto, Aluguel

# Registro dos atributos a serem gerenciados pelo Django Admin (GERENCIAMENTO)

admin.site.register(Cliente)
admin.site.register(Produto)
admin.site.register(Aluguel)
