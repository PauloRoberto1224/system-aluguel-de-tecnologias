import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../api/app';

const schema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  descricao: z.string().min(1, 'Descrição é obrigatória'),
  codigo_produto: z.string().min(1, 'Código do produto é obrigatório'),
  valor_aluguel: z.string().min(1, 'Valor de aluguel é obrigatório').regex(/^\d+(\.\d{1,2})?$/, 'Valor deve ser um número válido'),
  disponibilidade: z.boolean(),
});

type FormData = z.infer<typeof schema>;

export const FormProdutoEdit: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const navigation = useNavigate();

  const onSubmit = async (data: FormData) => {
    const response = await api.put('/produtos/', data)
    if (response.status == 201) {
      window.alert("Cliente criado com sucesso!")
      navigation('/')
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="nome">Nome:</label>
        <input type="text" id="nome" {...register('nome')} />
        {errors.nome && <span className={styles.error}>{errors.nome.message}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="descricao">Descrição:</label>
        <input type="text" id="descricao" {...register('descricao')} />
        {errors.descricao && <span className={styles.error}>{errors.descricao.message}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="codigo_produto">Código do Produto:</label>
        <input type="text" id="codigo_produto" {...register('codigo_produto')} />
        {errors.codigo_produto && <span className={styles.error}>{errors.codigo_produto.message}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="valor_aluguel">Valor de Aluguel:</label>
        <input type="text" id="valor_aluguel" {...register('valor_aluguel')} />
        {errors.valor_aluguel && <span className={styles.error}>{errors.valor_aluguel.message}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="disponibilidade">Disponibilidade:</label>
        <input type="checkbox" id="disponibilidade" {...register('disponibilidade')} />
      </div>

      <button type="submit">Enviar</button>
    </form>
  );
};
