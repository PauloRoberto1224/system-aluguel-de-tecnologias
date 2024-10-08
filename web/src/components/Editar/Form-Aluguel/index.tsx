import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './styles.module.css';

import { useNavigate } from 'react-router-dom';
import { api } from '../../../api/app';
import type { Cliente } from '../../../interfaces/Client';
import type { Product } from '../../../interfaces/Produto';


const schema = z.object({
  data_inicio: z.string().min(1, 'Data de início é obrigatória').regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato inválido, use YYYY-MM-DD'),
  data_fim: z.string().min(1, 'Data de fim é obrigatória').regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato inválido, use YYYY-MM-DD'),
  valor_total: z.string().min(1, 'Valor total é obrigatório').regex(/^\d+(\.\d{1,2})?$/, 'Valor deve ser um número válido'),
  cliente: z.string().min(1, 'ID do cliente é obrigatório'),
  produto: z.string().min(1, 'ID do produto é obrigatório'),
});

type FormData = z.infer<typeof schema>;

interface FormAluguelEditProps {
  aluguel: FormData;
  id: number
}

export const FormAluguelEdit: React.FC<FormAluguelEditProps> = ({ aluguel, id}) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const navigation = useNavigate();
    
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [produtos, setProdutos] = useState<Product[]>([]);

  useEffect(() => {
    const fetchClientes = async () => {
      const response = await api.get('/clientes/');
      setClientes(response.data);
    };

    const fetchProdutos = async () => {
      const response = await api.get('/produtos/');
      setProdutos(response.data);
    };

    fetchClientes();
    fetchProdutos();
  }, []);

  useEffect(() => {
    reset(aluguel);
  }, [aluguel, reset]);
  
  const onSubmit = async (data: FormData) => {
    const response = await api.put(`/alugueis/${id}/`, data)
    if (response.status == 200) {
      window.alert("Aluguel atualizado com sucesso!")
      window.location.reload();
      navigation('/aluguel')
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="data_inicio">Data de Início:</label>
        <input type="date" id="data_inicio" {...register('data_inicio')} />
        {errors.data_inicio && <span className={styles.error}>{errors.data_inicio.message}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="data_fim">Data de Fim:</label>
        <input type="date" id="data_fim" {...register('data_fim')} />
        {errors.data_fim && <span className={styles.error}>{errors.data_fim.message}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="valor_total">Valor Total:</label>
        <input type="text" id="valor_total" {...register('valor_total')} />
        {errors.valor_total && <span className={styles.error}>{errors.valor_total.message}</span>}
      </div>

       <div className={styles.field}>
        <label htmlFor="cliente">Cliente:</label>
        <select id="cliente" {...register('cliente')}>
          <option value="">Selecione um cliente</option>
          {clientes.map(cliente => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nome}
            </option>
          ))}
        </select>
        {errors.cliente && <span className={styles.error}>{errors.cliente.message}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="produto">Produto:</label>
        <select id="produto" {...register('produto')}>
          <option value="">Selecione um produto</option>
          {produtos.map(produto => (
            <option key={produto.id} value={produto.id}>
              {produto.nome}
            </option>
          ))}
        </select>
        {errors.produto && <span className={styles.error}>{errors.produto.message}</span>}
      </div>

      <button type="submit">Enviar</button>
    </form>
  );
};
