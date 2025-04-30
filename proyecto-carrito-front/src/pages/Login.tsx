import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(''); // Limpiar error anterior

    try {
      const response = await fetch('https://backend-ecommerce-t9cg.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: email,
          password: password
        })
      });

      if (response.ok) {
        // Puedes guardar el token aquí si el backend lo devuelve
        navigate('/'); // Redirigir al Home
      } else {
        setError('Correo o contraseña incorrectos');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
    }
  };

  return (
      <div className="form-container">
        <div id="login-form">
          <h2 className="form-title">Login</h2>
          {error && <p className="error-message">{error}</p>}
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
