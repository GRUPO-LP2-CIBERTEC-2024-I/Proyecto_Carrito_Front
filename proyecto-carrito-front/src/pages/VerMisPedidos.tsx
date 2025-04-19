import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const VerMisPedidos: React.FC = () => {
  return (
    <div className='containerr'>
      {/* Navbar reutilizable */}
      <Header />

      <div className="container mt-5">
        <h2 style={{ marginBottom: '50px', marginTop: '100px' }}>Mis Pedidos</h2>
        <div className="card mb-3">
          <div className="card-body">
            <div className="row" style={{ alignItems: 'center' }}>
              <div className="col-md-2">
                <img src="https://grupo-lp2-cibertec-2024-i.github.io/proyecto-carrito/imagenes/Teclado%20Mec%C3%A1nico%20Razer%20BlackWidow.JPG" className="img-fluid" alt="Producto" />
              </div>
              <div className="col-md-6">
                <h5 className="card-title">Teclado Ryzer</h5>
                <p className="card-text">Switch Red, RGB 100% | Cantidad: 1</p>
                <p className="card-text">
                  <small className="text-muted">Estado del Pedido: Entregado</small>
                </p>
              </div>
              <div
                className="col-md-4"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <a className="btn btn-warning" href="/verDetallesPedido" role="button" style={{ width: '200px' }}>
                  Ver más detalles
                </a>
                <button type="button" className="btn btn-success" style={{ width: '200px' }}>
                  Volver a comprar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer reutilizable */}
      <Footer />
    </div>
  );
};

export default VerMisPedidos;