import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  username: z.string().min(1, 'Usuário é obrigatório'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

type FormData = z.infer<typeof schema>;

export const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    if (data.username === 'admin' && data.password === 'admin') {
      localStorage.setItem('session', 'loggedIn');
      navigate('/home');
    } else {
      alert('Usuário ou senha incorretos.');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h2>Login</h2>
        <div className={styles.field}>
          <label htmlFor="username">Usuário:</label>
          <input type="text" id="username" {...register('username')} />
          {errors.username && <span className={styles.error}>{errors.username.message}</span>}
        </div>
        <div className={styles.field}>
          <label htmlFor="password">Senha:</label>
          <input type="password" id="password" {...register('password')} />
          {errors.password && <span className={styles.error}>{errors.password.message}</span>}
        </div>
        <button type="submit">Entrar</button>
      </form>

      {/* Adicionando as logos abaixo do formulário */}
      <div className={styles.logoContainerWrapper}>
        <div className={styles.logoContainer}>
          <img src="/logos/logo1.jpg" alt="Logo 01" className={styles.logo} />
          <img src="/logos/logo2.jpg" alt="Logo 02" className={styles.logo} />
          <img src="/logos/logo4.jpg" alt="Logo 04" className={styles.logo} />
          <img src="/logos/logo3.jpeg" alt="Logo 03" className={styles.logo} />
        </div>
      </div>

      {/* Rodapé com os direitos autorais */}
      <footer className={styles.footer}>
        <p>&copy; 2024 Digital Operações e Soluções em Sistemas.</p>
        <p>Desenvolvido por Digital_doctorsslz. Contato: (98) 9 8408-7441</p>
      </footer>
    </div>
  );
};
