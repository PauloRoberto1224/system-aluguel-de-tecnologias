# Aqui você implementou as views usando o Django REST Framework, que expõe os dados da API para as operações de CRUD.

from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from .models import Cliente, Produto, Aluguel
from .serializers import ClienteSerializer, ProdutoSerializer, AluguelSerializer

# ViewSet para gerenciar operações de CRUD do modelo Cliente
class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

# ViewSet para gerenciar operações de CRUD do modelo Produto
class ProdutoViewSet(viewsets.ModelViewSet):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer

# ViewSet para gerenciar operações de CRUD do modelo Aluguel, com verificação de disponibilidade
class AluguelViewSet(viewsets.ModelViewSet):
    queryset = Aluguel.objects.all()
    serializer_class = AluguelSerializer

    # Verifica se o produto está disponível no período antes de criar o aluguel
    def create(self, request, *args, **kwargs):
        produto = Produto.objects.get(id=request.data['produto'])
        data_inicio = request.data['data_inicio']
        data_fim = request.data['data_fim']

        # Verifica se há aluguéis que se sobrepõem no período solicitado
        alugueis_existentes = Aluguel.objects.filter(produto=produto, data_fim__gte=data_inicio, data_inicio__lte=data_fim)
        
        if alugueis_existentes.exists():
            return Response({"erro": "Produto já alugado nesse período"}, status=status.HTTP_400_BAD_REQUEST)

        return super().create(request, *args, **kwargs)

