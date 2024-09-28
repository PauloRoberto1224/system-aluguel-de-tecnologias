import React from 'react';
import './style.css';
import { AiOutlineClose } from 'react-icons/ai'; 

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div className="overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <h2>{title}</h2>
        <a className="close-button" onClick={onClose}>
          <AiOutlineClose size={24} />
        </a>
        <div>{children}</div>
      </div>
    </div>
  );
};
