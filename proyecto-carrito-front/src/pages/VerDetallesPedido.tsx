import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const VerDetallesPedido: React.FC = () => {
  return (
    <div className='containerr'>
      <Header />
      <div className="container mt-5">
        <div className="card" style={{ marginTop: '150px' }}>
          <div className="card-header">
            <h3>Detalles del Pedido</h3>
          </div>
          <div className="card-body">
            <form style={{ marginTop: '50px' }}>
              {[
                { label: 'ID de Venta', id: 'idVenta' },
                { label: 'Fecha de Compra', id: 'fechaCompra' },
                { label: 'Monto', id: 'monto' },
                { label: 'ID del Producto', id: 'idProducto' },
                { label: 'Nombre del Producto', id: 'nombreProducto' },
                { label: 'ID de Cliente', id: 'idCliente' },
                { label: 'Nombre del Cliente', id: 'nombreCliente' },
                { label: 'Apellido', id: 'apellido' },
                { label: 'DNI', id: 'dni' },
                { label: 'Dirección', id: 'direccion' },
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
              <div className="form-group row" style={{ marginTop: '50px', marginLeft: '150px' }}>
                <div className="col-sm-10">
                  <a className="btn btn-secondary" href="/verMisPedidos" role="button">
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

export default VerDetallesPedido;