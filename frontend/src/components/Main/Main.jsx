import React, { useContext } from "react";
import Popup from "./Popup/Popup";
import NewCard from "../NewCard/NewCard";
import EditProfile from "../EditProfile/EditProfile";
import EditAvatar from "../Avatar/EditAvatar";
import Card from "../Card/Card";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Main ({onOpenPopup, onClosePopup, popup, onCardLike, onCardDelete, cards, onAddPlace}) {
  const {currentUser} = useContext(CurrentUserContext);

  const newCardPopup = { title: "Nuevo lugar", children: <NewCard onAddPlaceSubmit={onAddPlace}/> };
  const editProfilePopup = { title: "Editar perfil", children: <EditProfile />}
  const editAvatarPopup = { title: "Cambiar foto de perfil", children: <EditAvatar />}

    return (
        <main className="content">
        <section className="profile">
          <div className="profile__avatar-container">
            <img
              className="profile__avatar"
              src= {currentUser.avatar}
              alt="Something's wrong"
            />
            <button className="profile__avatar-edit" type="button" onClick={() => onOpenPopup(editAvatarPopup)}>
              <img src="../images/AvatarEdit.png" alt="Edit Avatar" />
            </button>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__description">{currentUser.about}</p>
          </div>
          <button className="profile__edit" type="button" name="edit" onClick={() => onOpenPopup(editProfilePopup)}>
            <img src="../images/editbutton.png" alt="Edit Button" />
          </button>
          <button className="profile__add" type="button" name="add" onClick={() => onOpenPopup(newCardPopup)}>
            <img src="../images/addbutton.png" alt="Add Button" />
          </button>
        </section>
        <ul className="cards">
          {cards.map((card) => (
            <Card key={card._id} card={card} onClick={onOpenPopup} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
          ))}
        </ul>
        {popup && (
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
        )}
      </main>
    )
};

export default Main