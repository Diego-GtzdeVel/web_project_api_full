import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Login from "./Login/Login";
import Register from "./Register/Register";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import InfoTooltip from "./InfoTooltip/InfoTooltip";

import * as auth from "../utils/auth.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";

function App() {
  const [token, setToken] = useState(localStorage.getItem("jwt") || "");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [tooltipSource, setTooltipSource] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("jwt");
    if (storedToken) {
      setToken(storedToken);
      api.setToken(storedToken);

      auth.getToken(storedToken)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
          navigate("/");
        })
        .catch((err) => {
          console.error("Error al verificar token:", err);
        });
    }
  }, [navigate]);

  useEffect(() => {
    if (isLoggedIn && token) {
      api.setToken(token);

      api.getUserInfo()
        .then(setCurrentUser)
        .catch(console.error);

      api.getInitialCards()
        .then(setCards)
        .catch(console.error);
    }
  }, [isLoggedIn, token]);

  function handleRegister({ email, password }) {
    setTooltipSource("register");
    setIsInfoTooltipOpen(true);
    setIsSuccess(false);

    auth.register({ email, password })
      .then(() => {
        setIsSuccess(true);
      })
      .catch(() => {
        setIsSuccess(false);
      });
  }

  function handleLogin({ email, password }) {
    auth.authorize({ email, password })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setToken(data.token);
          api.setToken(data.token);
          setIsLoggedIn(true);
          navigate("/");
        }
      })
      .catch((err) => {
        console.error("Error de autenticación:", err);
        setIsSuccess(false);
        navigate("/signin");
      });
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setToken("");
    api.setToken("");
    setIsLoggedIn(false);
    navigate("/signin");
  }

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  function closeAllPopups() {
    setIsInfoTooltipOpen(false);
    if (tooltipSource === "register" && isSuccess) {
      navigate("/signin");
    }
    setTooltipSource(null);
  }

  async function handleCardLike(card) {
    const isLiked = card.isLiked;

    await api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(console.error);
  }

  function handleCardDelete(cardId) {
    api.deleteCard(cardId)
      .then(() => {
        setCards((prevCards) => prevCards.filter((card) => card._id !== cardId));
      })
      .catch(console.error);
  }

  function handleAddPlaceSubmit(newCardData) {
    api.addNewCard(newCardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopup();
      })
      .catch(console.error);
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <div className="page">
        <Header isLoggedIn={isLoggedIn} onSignOut={handleSignOut} />

        <Routes>
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Register onRegister={handleRegister} />} />
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Main
                  onOpenPopup={handleOpenPopup}
                  onClosePopup={handleClosePopup}
                  popup={popup}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  onAddPlace={handleAddPlaceSubmit}
                />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/signin"} replace />} />
        </Routes>

        <Footer />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
