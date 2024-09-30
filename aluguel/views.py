from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from .models import Cliente, Produto, Aluguel
from .serializers import ClienteSerializer, ProdutoSerializer, AluguelSerializer
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters  # Adicionado para os filtros personalizados

# Filtro personalizado para busca parcial de nome (nome__icontains)
class ClienteFilter(filters.FilterSet):
    nome = filters.CharFilter(field_name='nome', lookup_expr='icontains')  # Busca parcial insensível a maiúsculas/minúsculas

    class Meta:
        model = Cliente
        fields = ['nome']

# ViewSet para gerenciar operações de CRUD do modelo Cliente
class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ClienteFilter  # Substituído para usar o filtro personalizado buscando nomes parcialmente 

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
        serializer = AluguelSerializer(data=request.data)
        
        if serializer.is_valid():
            produto = Produto.objects.get(id=request.data['produto'])
            data_inicio = serializer.validated_data['data_inicio']
            data_fim = serializer.validated_data['data_fim']

            # Verifica se há aluguéis que se sobrepõem no período solicitado
            alugueis_existentes = Aluguel.objects.filter(produto=produto, data_fim__gte=data_inicio, data_inicio__lte=data_fim)

            if alugueis_existentes.exists():
                return Response({"erro": "Produto já alugado nesse período"}, status=status.HTTP_400_BAD_REQUEST)

            # Salva o aluguel com o produto associado
            serializer.save(produto=produto)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Método para atualizar o aluguel
    def update(self, request, *args, **kwargs):
        aluguel = self.get_object()
        serializer = AluguelSerializer(aluguel, data=request.data)

        if serializer.is_valid():
            produto = Produto.objects.get(id=request.data['produto'])
            data_inicio = serializer.validated_data['data_inicio']
            data_fim = serializer.validated_data['data_fim']

            # Verifica se o produto está disponível no novo período
            alugueis_existentes = Aluguel.objects.filter(produto=produto, data_fim__gte=data_inicio, data_inicio__lte=data_fim).exclude(id=aluguel.id)

            if alugueis_existentes.exists():
                return Response({"erro": "Produto já alugado nesse período"}, status=status.HTTP_400_BAD_REQUEST)

            # Atualiza e salva o objeto
            serializer.save(produto=produto)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
