import React, { useState } from 'react';
import '../styles/Registro.css'; // Mueve los estilos en línea a este archivo

const Registro: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    birthDate: '',
    gender: '',
    email: '',
    password: '',
    termsAccepted: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = () => {
    console.log('Datos del formulario:', formData);
    // Aquí puedes agregar la lógica para enviar los datos al servidor
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Registrarse</h2>
      <form>
        <div className="form-group">
          <label htmlFor="firstName">Nombres</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            placeholder="Nombres"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Apellidos</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            placeholder="Apellidos"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Dirección</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            placeholder="Dirección"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="birthDate">Fecha de Nacimiento</label>
          <input
            type="date"
            className="form-control"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Género</label>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="male"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleChange}
              required
            />
            <label className="form-check-label" htmlFor="male">
              Masculino
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="female"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleChange}
              required
            />
            <label className="form-check-label" htmlFor="female">
              Femenino
            </label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="terms"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
            required
          />
          <label className="form-check-label" htmlFor="terms">
            Acepto los términos y condiciones
          </label>
        </div>
        <button type="button" className="btn btn-primary btn-block" onClick={handleSubmit}>
          Registrarse
        </button>
        <p className="switch-link">
          Ya tengo una cuenta <a href="/login">Iniciar sesión</a>
        </p>
      </form>
    </div>
  );
};

export default Registro;