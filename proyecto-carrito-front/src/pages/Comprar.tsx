import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useCart } from '../context/CartContext'; // Importa el contexto del carrito
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import '../styles/Comprar.css';
import { apiFetch } from '../api';

const Comprar: React.FC = () => {
  const { cartItems, total, clearCart } = useCart(); // Obtén los productos del carrito y el total
  const [direccion, setDireccion] = useState('');
  const [distrito, setDistrito] = useState('');
  const [nombreReceptor, setNombreReceptor] = useState('');
  const [referencia, setReferencia] = useState('');
  const [telefono, setTelefono] = useState('');
  const { isAuthenticated ,loading} = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading &&!isAuthenticated) {
      Swal.fire({
        title: "Acceso denegado",
        text: "Debes iniciar sesión para realizar una compra",
        icon: "warning",
        confirmButtonText: "OK"
      });
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  const confirmarCompra = async () => {
    if (!isAuthenticated) {
      return;
    }
    const body = {
      ventaDTO: {
        fechaVenta: new Date(), // Fecha fija por ahora
        cli: "jhon2226g@gmail.com", // Cliente fijo por ahora
      },
      detallesDTO: cartItems.map((item) => ({
        cant: item.quantity, // Cantidad del producto en el carrito
        producto: item.id, // ID del producto en el carrito
      })),
      pedidoDTO: {
        distrito: distrito, 
        direccion: direccion, 
        referencia: referencia, 
        nombreReceptor: nombreReceptor,
        telefono: telefono, 
      },
    };

    try {
      const response = await apiFetch(
        "/api/pago/crear-preferencia",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
          credentials: "include"
        }
      );

      const data = await response;
      console.log("Respuesta del servidor:", data);

      if (data.init_point) {
        clearCart(); // Limpiar el carrito después de la compra
        Swal.fire({
          title: "Compra exitosa",
          text: "Tu compra ha sido procesada con éxito.",
          icon: "success",
          confirmButtonText: "OK",
        });
        // Redirigir al enlace de MercadoPago
        window.open(data.init_point, '_blank');
      } else {
        throw new Error("No se recibió el enlace de redirección.");
      }
    } catch (error) {
      console.error("Error al realizar la compra:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al procesar tu compra. Por favor, inténtalo de nuevo.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
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
                  Dirección
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
                <label htmlFor="distrito" className="form-label">
                  Distrito
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="distrito"
                  value={distrito}
                  onChange={(e) => setDistrito(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="nombre-receptor" className="form-label">
                  Nombre del Receptor
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre-receptor"
                  value={nombreReceptor}
                  onChange={(e) => setNombreReceptor(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="referencia" className="form-label">
                  Referencia
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="referencia"
                  value={referencia}
                  onChange={(e) => setReferencia(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="telefono" className="form-label">
                  Teléfono
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="telefono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
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