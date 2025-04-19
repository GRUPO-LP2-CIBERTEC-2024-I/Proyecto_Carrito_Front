import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useCart } from '../context/CartContext'; // Importa el contexto del carrito
import '../styles/Comprar.css';

const Comprar: React.FC = () => {
  const { cartItems, total, clearCart } = useCart(); // Obtén los productos del carrito y el total
  const [direccion, setDireccion] = useState('');
  const [nombreTarjeta, setNombreTarjeta] = useState('');
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [fechaExpiracion, setFechaExpiracion] = useState('');
  const [cvv, setCvv] = useState('');

  const confirmarCompra = () => {
    Swal.fire({
      title: '¡Tu compra ha sido realizada con éxito!',
      text: 'Estaremos informándote de tu pedido.',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart(); // Limpia el carrito después de la compra
        window.location.href = '/';
      }
    });
  };

  const cancelarCompra = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, quiero cancelar!',
      cancelButtonText: 'No :(',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/';
      }
    });
  };

  return (
    <div className="containerr">
      <Header />
      <div className="container mt-5">
        <div className="row" style={{ marginTop: '100px' }}>
          {/* Formulario de Compra */}
          <div className="col-md-8">
            <h2 style={{ marginBottom: '50px' }}>Formulario de Compra</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="direccion" className="form-label">
                  Dirección de envío
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="direccion"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="nombre-tarjeta" className="form-label">
                  Nombre en la tarjeta
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre-tarjeta"
                  value={nombreTarjeta}
                  onChange={(e) => setNombreTarjeta(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="numero-tarjeta" className="form-label">
                  Número de tarjeta
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="numero-tarjeta"
                  value={numeroTarjeta}
                  onChange={(e) => setNumeroTarjeta(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="fecha-expiracion" className="form-label">
                  Fecha de expiración
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="fecha-expiracion"
                  placeholder="MM/AA"
                  value={fechaExpiracion}
                  onChange={(e) => setFechaExpiracion(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="cvv" className="form-label">
                  CVV
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cvv"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  required
                />
              </div>
              <button
                type="button"
                className="btn btn-success"
                onClick={confirmarCompra}
              >
                Confirmar
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={cancelarCompra}
              >
                Cancelar
              </button>
            </form>
          </div>

          {/* Resumen del Pedido */}
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Resumen del pedido</h5>
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-image"
                    />
                    <div className="cart-item-details">
                      <p>{item.name}</p>
                      <p>
                        {item.quantity} x S/.{item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
                <hr />
                <h5>
                  Total: <span id="total">S/.{total.toFixed(2)}</span>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Comprar;