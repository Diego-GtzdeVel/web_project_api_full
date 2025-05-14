import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({ email, password });
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Inicia sesión</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          className="auth__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="auth__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="auth__button">
          Iniciar sesión
        </button>
      </form>
      <p className="auth__redirect">
        ¿Aún no eres miembro? <Link to="/signup" className="auth__link">Regístrate aquí</Link>
      </p>
    </div>
  );
}

export default Login;
