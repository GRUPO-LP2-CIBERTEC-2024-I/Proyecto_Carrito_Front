import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Importa el contexto del carrito
import '../styles/Header.css';

const Header: React.FC = () => {
  const [isAccountDropdownVisible, setIsAccountDropdownVisible] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const { cartItems, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();

  const navigate = useNavigate(); // Inicializa useNavigate

  const toggleAccountDropdown = () => {
    setIsAccountDropdownVisible(!isAccountDropdownVisible);
  };

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };
  
  const handleCheckout = () => {
    navigate('/comprar'); // Redirige a la pantalla de compra
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'rgb(29, 30, 44)' }}>
        <div className="container-fluid">
          {/* Logo */}
          <Link to="/" className="navbar-brand">
            <img className="logo" src="/images/logo.jpg" alt="Logo" />
          </Link>

          {/* Botón para colapsar el menú en pantallas pequeñas */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menú de navegación */}
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="/" style={{ color: 'white' }}>
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/productos" style={{ color: 'white' }}>
                  Productos
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ color: 'white' }}
                >
                  Categorías
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Monitores
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Periféricos
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Componentes
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/quienessomos" style={{ color: 'white' }}>
                  Quiénes somos
                </Link>
              </li>
            </ul>

            {/* Cuenta */}
            <div
              id="divCuenta"
              className="d-flex align-items-center"
              style={{ marginRight: '50px', cursor: 'pointer' }}
              onClick={toggleAccountDropdown}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
                style={{ color: 'white', marginBottom: '10px', marginRight: '5px' }}
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                />
              </svg>
              <h6 style={{ color: 'white' }}>Mi cuenta</h6>
            </div>
            {isAccountDropdownVisible && (
              <div id="divCuentaDetalles" style={{ position: 'absolute', top: '60px', right: '150px', zIndex: 40 }}>
                <div id="myDropdown" className="dropdown-content">
                  <Link to="/verMiInformacion">Ver mi información</Link>
                  <Link to="/verMisPedidos">Ver mis pedidos</Link>
                  <Link to="/login">Cerrar Sesión</Link>
                </div>
              </div>
            )}

            {/* Carrito */}
            <div
              className="d-flex align-items-center"
              style={{ marginRight: '15px', cursor: 'pointer' }}
              onClick={toggleCart}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                fill="currentColor"
                className="bi bi-cart-fill"
                viewBox="0 0 16 16"
                style={{ color: 'white', marginBottom: '10px' }}
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
              </svg>
              <p className="count-product">{cartItems.length}</p> {/* Muestra la cantidad de productos */}
              <h6 style={{ color: 'white' }}>Carrito</h6>
            </div>

            {isCartVisible && (
                <div className="cart-products" id="products-id">
                  <p className="close-btn" onClick={toggleCart}>X</p>
                  <h3>Mi carrito</h3>
                  {cartItems.length > 0 ? (
                      <>
                        <div className="card-items" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                          {cartItems.map((item) => (
                              <div key={item.id} className="cart-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', borderBottom: '1px solid #eee', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
                                <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                                <div style={{ flex: 1, marginLeft: '15px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                  <h5 style={{ fontSize: '1.2rem', fontWeight: '600' }}>{item.name}</h5>
                                  <p style={{ fontSize: '1rem', color: '#555' }}>Precio: S/.{item.price}</p>
                                  <div className="quantity-controls" style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#f1f1f1', padding: '6px 12px', borderRadius: '8px', width: 'fit-content', marginTop: '10px' }}>
                                    <button onClick={() => decreaseQuantity(item.id)} style={{ backgroundColor: '#e74c3c', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '1.2rem', cursor: 'pointer' }}>−</button>
                                    <span style={{ fontSize: '1.1rem', fontWeight: 'bold', minWidth: '24px', textAlign: 'center' }}>{item.quantity}</span>
                                    <button onClick={() => increaseQuantity(item.id)} style={{ backgroundColor: '#2ecc71', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '1.2rem', cursor: 'pointer' }}>+</button>
                                  </div>
                                </div>
                                <button className="btn-eliminar" onClick={() => removeFromCart(item.id)} style={{ backgroundColor: '#e74c3c', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer' }}>
                                  Eliminar
                                </button>
                              </div>
                          ))}
                        </div>
                        <h2>
                          Total: S/.
                          <strong className="price-total">
                            {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
                          </strong>
                        </h2>

                        <button
                            className="btn btn-success"
                            onClick={handleCheckout}
                            id="buy-button"
                            disabled={cartItems.length === 0}
                        >
                          Comprar
                        </button>

                        <button className="btn btn-warning" onClick={clearCart}>
                          Vaciar Carrito
                        </button>
                      </>
                  ) : (
                      <div className="carrito-vacio">
                        <span role="img" aria-label="empty" style={{ fontSize: '2rem' }}>🛒</span>
                        <p style={{ fontSize: '1.2rem', color: '#666', marginTop: '10px' }}>
                          ¡Tu carrito está vacío por ahora!
                        </p>
                        <p style={{ fontSize: '0.95rem', color: '#999' }}>
                          Agrega algunos productos y aparecerán aquí.
                        </p>
                      </div>
                  )}
                </div>
            )}

          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;