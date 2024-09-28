import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './styles.module.css';
import { api } from '../../api/app';
import { useNavigate } from 'react-router-dom';


const schema = z.object({
  data_inicio: z.string().min(1, 'Data de início é obrigatória').regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato inválido, use YYYY-MM-DD'),
  data_fim: z.string().min(1, 'Data de fim é obrigatória').regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato inválido, use YYYY-MM-DD'),
  valor_total: z.string().min(1, 'Valor total é obrigatório').regex(/^\d+(\.\d{1,2})?$/, 'Valor deve ser um número válido'),
  cliente: z.number().min(1, 'ID do cliente é obrigatório'),
  produto: z.number().min(1, 'ID do produto é obrigatório'),
});

type FormData = z.infer<typeof schema>;

export const FormAluguel: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const navigation = useNavigate();

  const onSubmit = async (data: FormData) => {
    const response = await api.post('/alugueis/', data)
    if (response.status == 201) {
      window.alert("Cliente criado com sucesso!")
      navigation('/')
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
        <label htmlFor="cliente">ID do Cliente:</label>
        <input type="number" id="cliente" {...register('cliente')} />
        {errors.cliente && <span className={styles.error}>{errors.cliente.message}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="produto">ID do Produto:</label>
        <input type="number" id="produto" {...register('produto')} />
        {errors.produto && <span className={styles.error}>{errors.produto.message}</span>}
      </div>

      <button type="submit">Enviar</button>
    </form>
  );
};
