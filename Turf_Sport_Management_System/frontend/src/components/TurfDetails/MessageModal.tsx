import React from 'react';
import { Modal, ModalContent, ModalOverlay, CloseButton, Info, Button } from './styles'; // Styled components for modal

interface MessageModalProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const MessageModal: React.FC<MessageModalProps> = ({ message, type, onClose }) => {
  return (
    <Modal>
      <ModalOverlay onClick={onClose} />
      <ModalContent>
        <CloseButton onClick={onClose}>X</CloseButton>
        <Info style={{ color: type === 'error' ? 'red' : 'green' }}>
          {message}
        </Info>
        <Button onClick={onClose}>Close</Button>
      </ModalContent>
    </Modal>
  );
};

export default MessageModal;
