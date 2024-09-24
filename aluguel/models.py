from django.db import models
# teste de envio de arquivos  para o github
# informações básicas que serão armazenadas sobre os clientes.
class Cliente(models.Model):
    nome = models.CharField(max_length=100)  
    cpf = models.CharField(max_length=11, unique=True)  # CPF único
    email = models.EmailField()  # Email do cliente
    contato = models.CharField(max_length=15)  # Telefone ou contato
    rua = models.CharField(max_length=100)  # Rua
    numero = models.CharField(max_length=10)  # Número da casa
    cidade = models.CharField(max_length=50)  # Cidade
    estado = models.CharField(max_length=2)  # Estado (UF)
    cep = models.CharField(max_length=9)  # CEP

    def __str__(self):
        return self.nome  # Representação em string do cliente

#  define os atributos de um produto que pode ser alugado.
class Produto(models.Model):
    nome = models.CharField(max_length=100)  # Nome do produto
    descricao = models.TextField()  # Descrição do produto
    codigo_produto = models.CharField(max_length=10, unique=True)  # Código único do produto
    valor_aluguel = models.DecimalField(max_digits=10, decimal_places=2)  # Valor do aluguel por dia
    disponibilidade = models.BooleanField(default=True)  # Disponível para aluguel ou não

    def __str__(self):
        return self.nome  # Representação em string do produto

# relaciona um cliente e um produto em um intervalo de datas.
class Aluguel(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)  # Cliente que está alugando
    produto = models.ForeignKey(Produto, on_delete=models.CASCADE)  # Produto alugado
    data_inicio = models.DateField()  # Data de início do aluguel
    data_fim = models.DateField()  # Data de término do aluguel
    valor_total = models.DecimalField(max_digits=10, decimal_places=2)  # Valor total do aluguel

    # Calcula o valor total do aluguel com base nos dias de aluguel e o valor do produto (CHATGPT) 
    def calcular_valor_total(self):
        dias_aluguel = (self.data_fim - self.data_inicio).days  # Calcula a diferença em dias (CHATGPT)
        return dias_aluguel * self.produto.valor_aluguel  # Multiplica pelos dias (CHATGPT)

    # Sobrescreve o método save para calcular o valor total antes de salvar (CHATGPT)
    def save(self, *args, **kwargs):
        self.valor_total = self.calcular_valor_total()  # Define o valor total calculado (CHATGPT)
        super().save(*args, **kwargs)

    def __str__(self):
        return f'Aluguel de {self.produto.nome} por {self.cliente.nome}'
