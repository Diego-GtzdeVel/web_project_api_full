function ImagePopup(card) {
    return(
            <div className="image-popup__content">
              <img className="popup__image" src={card.link} alt={card.name} />
              <p className="popup__description">{card.name}</p>
            </div>
    );
}

export default ImagePopup