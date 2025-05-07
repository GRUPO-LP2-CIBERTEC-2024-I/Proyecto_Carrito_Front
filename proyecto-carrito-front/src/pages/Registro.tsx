import React, { useState } from 'react';
import '../styles/Registro.css';

const Registro: React.FC = () => {
  const [cliente, setCliente] = useState({
    IdCliente: null,
    Nombres: '',
    Apellidos: '',
    Direccion: '',
    FechaNacimiento: '',
    Sexo: '',
    dni: '',
    telefono: '',
    correo: '',
    Password: '',
    termsAccepted: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setCliente({
      ...cliente,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async () => {
    if (!cliente.termsAccepted) {
      alert('Debes aceptar los términos y condiciones.');
      return;
    }

    const payload = {
      idCliente: 0,
      nombres: cliente.Nombres,
      apellidos: cliente.Apellidos,
      direccion: cliente.Direccion,
      fechaNacimiento: cliente.FechaNacimiento,
      sexo: cliente.Sexo === 'male' ? 'm' : 'f',
      dni: cliente.dni,
      telefono: cliente.telefono,
      correo: cliente.correo,
      password: cliente.Password,
      estado: "A"
    };

    try {
      const response = await fetch(
          "https://backend-ecommerce-t9cg.onrender.com/Cliente/add",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
            credentials: "include"
          }
      );

      if (response.ok) {
        alert('Registro exitoso');

        setCliente({
          IdCliente: null,
          Nombres: '',
          Apellidos: '',
          Direccion: '',
          FechaNacimiento: '',
          Sexo: '',
          dni: '',
          telefono: '',
          correo: '',
          Password: '',
          termsAccepted: false,
        });
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'No se pudo registrar'}`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      } else {
        alert('Error desconocido');
      }
    }
  };

  return (
      <div className="form-container">
        <h2 className="form-title">Registrarse</h2>
        <form>
          <div className="form-group">
            <label htmlFor="Nombres">Nombres</label>
            <input type="text" name="Nombres" className="form-control" value={cliente.Nombres} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="Apellidos">Apellidos</label>
            <input type="text" name="Apellidos" className="form-control" value={cliente.Apellidos} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="Direccion">Dirección</label>
            <input type="text" name="Direccion" className="form-control" value={cliente.Direccion} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="FechaNacimiento">Fecha de Nacimiento</label>
            <input type="date" name="FechaNacimiento" className="form-control" value={cliente.FechaNacimiento} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Género</label>
            <div>
              <label>
                <input type="radio" name="Sexo" value="male" checked={cliente.Sexo === 'male'} onChange={handleChange} /> Masculino
              </label>
              <label>
                <input type="radio" name="Sexo" value="female" checked={cliente.Sexo === 'female'} onChange={handleChange} /> Femenino
              </label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="dni">DNI</label>
            <input type="text" name="dni" className="form-control" value={cliente.dni} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="telefono">Teléfono</label>
            <input type="text" name="telefono" className="form-control" value={cliente.telefono} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="correo">Correo electrónico</label>
            <input type="email" name="correo" className="form-control" value={cliente.correo} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="Password">Contraseña</label>
            <input type="password" name="Password" className="form-control" value={cliente.Password} onChange={handleChange} required />
          </div>
          <div className="form-group form-check">
            <input type="checkbox" name="termsAccepted" checked={cliente.termsAccepted} onChange={handleChange} />
            <label>Acepto los términos y condiciones</label>
          </div>
          <button type="button" onClick={handleSubmit} className="btn btn-primary">Registrarse</button>
        </form>
      </div>
  );
};

export default Registro;
