import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({ isLoggedIn, onSignOut }) {
  const location = useLocation();
  const { currentUser } = React.useContext(CurrentUserContext);

  const renderAuthLinks = () => {
    if (location.pathname === "/signup") {
      return <Link to="/signin" className="header__link">Inicia sesión</Link>;
    }
    if (location.pathname === "/signin") {
      return <Link to="/signup" className="header__link">Regístrate</Link>;
    }
    return null;
  };

  return (
    <header className="header">
      <img
        className="header__logo"
        src="../images/logo.svg"
        alt="Logo"
      />
      <div className="header__nav">
        {isLoggedIn ? (
          <>
            <span className="header__email">{currentUser.email}</span>
            <button className="header__logout" onClick={onSignOut}>Cerrar sesión</button>
          </>
        ) : (
          renderAuthLinks()
        )}
      </div>
    </header>
  );
}

export default Header;
