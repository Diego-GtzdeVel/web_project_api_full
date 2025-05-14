function Popup(props) {

    const {onClose, title, children} = props;

    return (
        <div className="popup">
          <div className={`popup__container ${
          !title ? "image-popup__container" : ""
        }`}>
            <button
              aria-label="Close modal"
              className="popup__close"
              type="button"
              onClick={onClose}
            >
                <img src="../images/closeicon.png" alt="Close Button" />
            </button>
            {title && <h3 className="popup__title">{title}</h3>}
            {children}
          </div>
        </div>
      )
};

export default Popup