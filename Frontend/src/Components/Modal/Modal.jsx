import React from 'react';
import './Modal.css'; // Add appropriate styling for your modal

const Modal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <div>{content}</div>
      </div>
    </div>
  );
};

export default Modal;
