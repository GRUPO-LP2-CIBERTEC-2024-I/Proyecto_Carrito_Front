import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const VerMiInformacion: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="card" style={{ marginTop: '150px' }}>
          <div className="card-header">
            <h3>Información del Usuario</h3>
          </div>
          <div className="card-body">
            <form style={{ marginTop: '50px' }}>
              {[
                { label: 'Apellidos', id: 'apellidos' },
                { label: 'Nombres', id: 'nombres' },
                { label: 'Dirección', id: 'direccion' },
                { label: 'Fecha de Nacimiento', id: 'fechaNacimiento' },
                { label: 'Sexo', id: 'sexo' },
                { label: 'Correo', id: 'correo' },
                { label: 'Contraseña', id: 'password' },
                { label: 'Estado', id: 'estado' },
              ].map((field) => (
                <div className="form-group row" style={{ marginTop: '5px' }} key={field.id}>
                  <label htmlFor={field.id} className="col-sm-2 col-form-label">
                    {field.label}:
                  </label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id={field.id} disabled />
                  </div>
                </div>
              ))}
              <div className="form-group row" style={{ marginTop: '50px' }}>
                <div className="col-sm-10">
                  <button type="button" className="btn btn-primary" id="editar">
                    Editar
                  </button>
                  <a className="btn btn-secondary" href="/" role="button">
                    Volver
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VerMiInformacion;