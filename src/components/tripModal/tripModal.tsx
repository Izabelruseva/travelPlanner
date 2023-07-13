import React from "react";
import "src/components/tripModal/tripModal.css";

interface ModalProps {
  imageUrl: string;
  onClose: () => void;
  onLike: () => void;
}

const Modal: React.FC<ModalProps> = ({ imageUrl, onClose, onLike }) => {
  return (
    <div className="modal-container">
      <div className="modal-content">
        <img src={imageUrl} alt="Instagram Post" />
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <button className="like-button" onClick={onLike}>
          &#10084;
        </button>
      </div>
    </div>
  );
};

export default Modal;
