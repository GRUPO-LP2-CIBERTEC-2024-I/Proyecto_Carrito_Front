import React, { useState } from 'react';
import '../styles/Login.css'; // Mueve los estilos en línea a este archivo

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Iniciar sesión con:', { email, password });
    // Aquí puedes agregar la lógica para autenticar al usuario
  };

  return (
    <div className="form-container">
      <div id="login-form">
        <h2 className="form-title">Login</h2>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="button" className="btn btn-primary btn-block" onClick={handleLogin}>
          Iniciar sesión
        </button>
        <p className="switch-link">
          No tengo una cuenta <a href="/registro">Registrarse</a>
        </p>
      </div>
    </div>
  );
};

export default Login;