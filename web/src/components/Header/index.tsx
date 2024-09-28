import React from 'react';
import { useNavigate } from 'react-router-dom';
import './header.css';

export const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('session');
    navigate('/');
  };

  return (
    <div className="logo">
      <div className='logo-icon'>
        <a href='/home'>System Alugueis</a>
      </div>
      <div className="links-nav">
        <a href="/aluguel">Alugueis</a>
        <a href="/produtos">Produtos</a>
        <a href="/home">Clientes</a>
        <a href="/" onClick={() => handleLogout()}>Sair</a>
      </div>
    </div>
  );
};
