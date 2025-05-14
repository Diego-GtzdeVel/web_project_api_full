import { useContext } from "react";
import ImagePopup from "../ImagePopup/ImagePopup";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Card({ card, onClick, onCardLike, onCardDelete }) {
    const { name, link, isLiked} = card;
    const {currentUser} = useContext(CurrentUserContext);

    const imageComponent = {children: <ImagePopup /> };

    const cardLikeButtonClassName = `card__like ${
        isLiked ? "card__like-active" : ""
    }`;

    function handleClick() {
      onClick(imageComponent);
    }

    return (
        <li className="card">
            <img className="card__image" src={link} alt={name} onClick={handleClick}/>
            <img
                className="card__delete"
                src="../images/trash.svg"
                alt="Delete"
                onClick={()=>onCardDelete(card._id)}
            />
            <div className="card__description">
                <p className="card__description-text">{name}</p>
                <button className={cardLikeButtonClassName} onClick={()=>onCardLike(card)}></button>
            </div>
        </li>
    );
}

export default Card;
