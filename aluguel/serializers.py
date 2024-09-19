#transformam os atributos gerenciados pelo Django em JSON ou vice-versa.

from rest_framework import serializers
from .models import Cliente, Produto, Aluguel

# Serializer para o modelo Cliente
class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'

# Serializer para o modelo Produto
class ProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = '__all__'

# Serializer para o modelo Aluguel
class AluguelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aluguel
        fields = '__all__'
