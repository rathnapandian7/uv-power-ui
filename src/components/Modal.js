import React from "react";
import "./Modal.css";

const Modal = ({ isOpen, onClose, children, title, size = "medium" }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className={`modal modal-${size}`}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
