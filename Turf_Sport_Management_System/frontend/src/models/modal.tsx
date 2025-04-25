// Modal.tsx
import React from 'react';
import { ModalWrapper, ModalContent, CloseButton } from './styles';

interface ModalProps {
  message: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onClose }) => {
  return (
    <ModalWrapper>
      <ModalContent>
        <p>{message}</p>
        <CloseButton onClick={onClose}>Close</CloseButton>
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;
