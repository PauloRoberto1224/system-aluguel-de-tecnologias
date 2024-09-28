import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './styles.module.css';
import { api } from '../../api/app';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  cpf: z.string()
    .min(1, 'CPF é obrigatório')
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF deve estar no formato XXX.XXX.XXX-XX'),
  contato: z.string().min(1, 'Contato é obrigatório'),
  email: z.string().email('Email inválido'),
  cep: z.string().min(1, 'CEP é obrigatório'),
  cidade: z.string().min(1, 'Cidade é obrigatória'),
  estado: z.string().min(1, 'Estado é obrigatório'),
  rua: z.string().min(1, 'Rua é obrigatória'),
  numero: z.string().min(1, 'Número é obrigatório'),
});

type FormData = z.infer<typeof schema>;

export const Form: React.FC = () => {
  const navigation = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const response = await api.post('/clientes/', data)
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
        <label htmlFor="cpf">CPF:</label>
        <input type="text" id="cpf" {...register('cpf')} />
        {errors.cpf && <span className={styles.error}>{errors.cpf.message}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="contato">Contato:</label>
        <input type="text" id="contato" {...register('contato')} />
        {errors.contato && <span className={styles.error}>{errors.contato.message}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" {...register('email')} />
        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="cep">CEP:</label>
        <input type="text" id="cep" {...register('cep')} />
        {errors.cep && <span className={styles.error}>{errors.cep.message}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="cidade">Cidade:</label>
        <input type="text" id="cidade" {...register('cidade')} />
        {errors.cidade && <span className={styles.error}>{errors.cidade.message}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="estado">Estado:</label>
        <input type="text" id="estado" {...register('estado')} />
        {errors.estado && <span className={styles.error}>{errors.estado.message}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="rua">Rua:</label>
        <input type="text" id="rua" {...register('rua')} />
        {errors.rua && <span className={styles.error}>{errors.rua.message}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="numero">Número:</label>
        <input type="text" id="numero" {...register('numero')} />
        {errors.numero && <span className={styles.error}>{errors.numero.message}</span>}
      </div>

      <button type="submit" className="sending-aluguel">Enviar</button>
    </form>
  );
};
