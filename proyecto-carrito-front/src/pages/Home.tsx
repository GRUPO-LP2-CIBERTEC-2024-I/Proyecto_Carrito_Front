import React, { useState } from 'react';
import Header from '../components/Header'; // Cambiado de Navbar a Header
import Footer from '../components/Footer';
import '../styles/Home.css'; // Importa los estilos específicos de esta página

const Home: React.FC = () => {
  const [isCartVisible, setIsCartVisible] = useState(false); 

  return (
    <div className='containerr'>
      <Header />

      <button
        className="btn btn-primary"
        onClick={() => setIsCartVisible(true)}
        style={{ margin: '20px' }}
      >
        Mostrar Carrito
      </button>

      <div id="carouselExample" className="carousel slide" style={{ zIndex: 2 }}>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/images/carrusel1.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="/images/carrusel2.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="/images/carrusel1.jpg" className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {isCartVisible && (
        <div className="cart-products" id="products-id">
          <p className="close-btn" onClick={() => setIsCartVisible(false)}>
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

      <Footer />
    </div>
  );
};

export default Home;