import { useContext } from "react";
import ImagePopup from "../ImagePopup/ImagePopup";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Card({ card, onClick, onCardLike, onCardDelete }) {
    const { name, link, isLiked} = card;
    const {currentUser} = useContext(CurrentUserContext);

    const imageComponent = {children: <ImagePopup /> };

    const cardLikeButtonClassName = `card__description-checkbox-icon ${
        isLiked ? "card__description-checkbox-icon-active" : ""
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
                <input type="checkbox" className="card__description-checkbox" id={`card-${name}`} />
                <label className="card__description-text" htmlFor={`card-${name}`}>
                    {name}
                    <span className={cardLikeButtonClassName} onClick={()=>onCardLike(card)}></span>
                </label>
            </div>
        </li>
    );
}

export default Card;
