import React from 'react';

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <div className={`infotooltip ${isOpen ? 'infotooltip__opened' : ''}`}>
    <button type="button" className="infotooltip__close" onClick={onClose}>
        <img src="/images/closeicon.png" alt="Close Button" />
    </button>
      <div className="infotooltip__content">
        <img
          src={isSuccess ? "/images/success.png" : "/images/error.png"}
          alt={isSuccess ? "Éxito" : "Error"}
          className="infotooltip__icon"
        />
        <h2 className="infotooltip__title">
          {isSuccess ? "¡Correcto! Ya estás registrado." : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
