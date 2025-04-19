import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'; // Asegúrate de tener este archivo para estilos adicionales

const Header: React.FC = () => {
  const [isAccountDropdownVisible, setIsAccountDropdownVisible] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const toggleAccountDropdown = () => {
    setIsAccountDropdownVisible(!isAccountDropdownVisible);
  };

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
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
              <p className="count-product">0</p>
              <h6 style={{ color: 'white' }}>Carrito</h6>
            </div>
            {isCartVisible && (
              <div className="cart-products" id="products-id">
                <p className="close-btn" onClick={toggleCart}>
                  X
                </p>
                <h3>Mi carrito</h3>
                <div className="card-items"></div>
                <h2>
                  Total: S/.<strong className="price-total">0</strong>
                </h2>
                <button className="btn btn-success" id="buy-button" disabled>
                  Comprar
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;