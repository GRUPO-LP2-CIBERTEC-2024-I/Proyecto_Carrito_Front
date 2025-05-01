import React, { useState } from 'react';
import '../styles/Registro.css';

const Registro: React.FC = () => {
  const [formData, setFormData] = useState({
    idCliente: 0,
    firstName: '',
    lastName: '',
    address: '',
    birthDate: '',
    gender: '',
    dni: '',
    telefono: '',
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

  const handleSubmit = async () => {
    // Validación básica antes del envío
    if (!formData.termsAccepted) {
      alert('Debes aceptar los términos y condiciones.');
      return;
    }

    const generatedId = Math.floor(Math.random() * 1000000);

    const cliente = {
      idCliente: generatedId,
      nombres: formData.firstName,
      apellidos: formData.lastName,
      direccion: formData.address,
      fechaNacimiento: formData.birthDate,
      sexo: formData.gender === 'male' ? 'M' : 'F',
      dni: formData.dni,
      telefono: formData.telefono,
      correo: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch('https://backend-ecommerce-t9cg.onrender.com/Cliente/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cliente),
      });

      if (response.ok) {
        alert('Registro exitoso');
        setFormData({
          idCliente: 0,
          firstName: '',
          lastName: '',
          address: '',
          birthDate: '',
          gender: '',
          dni: '',
          telefono: '',
          email: '',
          password: '',
          termsAccepted: false,
        });
      } else {
        const errorData = await response.json();
        alert('Error en el registro: ' + errorData.message);
      }
    } catch (error) {
      alert('Error de red: ' + error);
    }
  };

  return (
      <div className="form-container">
        <h2 className="form-title">Registrarse</h2>
        <form>
          <div className="form-group">
            <label htmlFor="firstName">Nombres</label>
            <input type="text" name="firstName" className="form-control" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Apellidos</label>
            <input type="text" name="lastName" className="form-control" value={formData.lastName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="address">Dirección</label>
            <input type="text" name="address" className="form-control" value={formData.address} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="birthDate">Fecha de Nacimiento</label>
            <input type="date" name="birthDate" className="form-control" value={formData.birthDate} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Género</label>
            <div>
              <label>
                <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} /> Masculino
              </label>
              <label>
                <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} /> Femenino
              </label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="dni">DNI</label>
            <input type="text" name="dni" className="form-control" value={formData.dni} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="telefono">Teléfono</label>
            <input type="text" name="telefono" className="form-control" value={formData.telefono} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="form-group form-check">
            <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} />
            <label>Acepto los términos y condiciones</label>
          </div>
          <button type="button" onClick={handleSubmit} className="btn btn-primary">Registrarse</button>
        </form>
      </div>
  );
};

export default Registro;
