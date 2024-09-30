# Serializers: transformam os atributos gerenciados pelo Django em JSON ou vice-versa.

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
    # Adiciona os campos personalizados para exibir os nomes
    cliente_nome = serializers.CharField(source='cliente.nome', read_only=True)
    produto_nome = serializers.CharField(source='produto.nome', read_only=True)

    class Meta:
        model = Aluguel
        fields = '__all__'  # Inclui todos os campos do Aluguel, junto com os campos personalizados
        # Ou, se preferir, pode listar os campos manualmente
        # fields = ['id', 'cliente', 'cliente_nome', 'produto', 'produto_nome', 'data_inicio', 'data_fim']
