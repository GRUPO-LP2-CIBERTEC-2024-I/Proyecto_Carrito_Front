import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useCart } from '../context/CartContext'; // Importa el contexto del carrito
import '../styles/Productos.css';

const Productos: React.FC = () => {
  const [productos, setProductos] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { cartItems, total, addToCart, removeFromCart, clearCart } = useCart(); // Usa el contexto del carrito
  const navigate = useNavigate(); // Inicializa useNavigate

  const BASE_URL = "/api/Producto/list";

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
          throw new Error(`Error al obtener los productos: ${response.statusText}`);
        }
        const data = await response.json();
        setProductos(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchProductos();
  }, []);

  const handleCheckout = () => {
    navigate('/comprar'); // Redirige a la pantalla de compra
  };

  return (
    <div className="containerr">
      <Header />
      <section className="content-wrap">
        <h2 style={{ marginTop: '70px', marginLeft: '5%' }}>Todos nuestros productos</h2>
        <hr style={{ marginTop: '50px' }} />
        <div className="products" id="productos-container">
          {error ? (
            <p style={{ color: 'red' }}>Error: {error}</p>
          ) : productos.length > 0 ? (
            productos.map((producto) => (
              <div className="carts" key={producto.idProducto}>
                <div>
                  <img src={producto.imagen} alt={producto.descripcion} />
                  <p>S/.<span>{producto.precioUnidad}</span></p>
                </div>
                <p className="title">{producto.descripcion}</p>
                <button
                  className="btn-agregar-carrito"
                  onClick={() =>
                    addToCart({
                      id: producto.idProducto,
                      name: producto.descripcion,
                      price: producto.precioUnidad,
                      image: producto.imagen,
                      quantity: 1,
                    })
                  }
                >
                  Agregar
                </button>
              </div>
            ))
          ) : (
            <p>Cargando productos...</p>
          )}
        </div>
        <h3 style={{ marginTop: '3%', marginLeft: '5%' }}>Carrito de Compras</h3>

        <div className="cart-summary">
          {cartItems.length > 0 ? (
            <>
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h5>{item.name}</h5>
                    <p>Precio: S/.{item.price}</p>
                    <p>Cantidad: {item.quantity}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
                </div>
              ))}
              <h4 className="cart-summary-total">Total: S/.{total.toFixed(2)}</h4>
              <button className="cart-summary-button" onClick={clearCart}>
                Vaciar Carrito
              </button>
              <button className="cart-summary-button" onClick={handleCheckout} style={{ marginTop: '10px' }}>
                Comprar
              </button>
            </>
          ) : (
            <p>El carrito está vacío.</p>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Productos;