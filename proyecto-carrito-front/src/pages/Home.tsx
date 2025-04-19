import React from 'react';
import Header from '../components/Header'; // Cambiado de Navbar a Header
import Footer from '../components/Footer';
import '../styles/Home.css'; // Importa los estilos específicos de esta página

const Home: React.FC = () => {

  return (
    <div className="containerr">
      <Header />

      {/* Carrusel */}
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

      {/* Contenido adicional */}
      <hr style={{ margin: '100px 0px' }} />

      <h1 style={{ textAlign: 'center' }}>¡Bienvenido, Usuario!</h1>

      {/* Información de la tienda */}
      <div className="container">
        <h2 className="text-center" style={{ marginBottom: '70px' }}>Sobre Nuestra Tienda</h2>
        <p className="text-center" style={{ marginBottom: '70px' }}>
          Encontrarás los mejores productos tecnológicos del mercado con la mejor calidad posible, solo para nuestros clientes.
        </p>
        <div className="row">
          <div className="col-md-6">
            <div className="card" style={{ boxShadow: '0px 0px 10px rgb(145, 145, 145)' }}>
              <img
                src="./images/ProductoCalidad.jpg"
                className="card-img-top"
                alt="Tienda Imagen 1"
                style={{ height: '300px', objectFit: 'contain' }}
              />
              <div className="card-body">
                <h5 className="card-title">Productos de Alta Calidad</h5>
                <p className="card-text">
                  Ofrecemos una amplia gama de productos tecnológicos de las mejores marcas del mercado, garantizando calidad y durabilidad.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card" style={{ boxShadow: '0px 0px 10px rgb(145, 145, 145)' }}>
              <img
                src="./images/Asistente.jpg"
                className="card-img-top"
                alt="Tienda Imagen 2"
                style={{ height: '300px', objectFit: 'contain' }}
              />
              <div className="card-body">
                <h5 className="card-title">Atención al Cliente</h5>
                <p className="card-text">
                  Nuestro equipo de atención al cliente está siempre disponible para ayudarte con cualquier consulta o problema que puedas tener.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr style={{ margin: '100px 0px' }} />

      {/* Productos destacados */}
      <h2 className="text-center" style={{ marginBottom: '50px' }}>Un poco de nuestros productos</h2>
      <div className="container">
        <div className="row" id="row-products">
          <div className="col-lg-3 col-md-6 col-sm-12 mb-4 product-card">
            <div className="card h-100">
              <img src="./images/products/keyboard-1.jpg" className="card-img-top" alt="Monitor" />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Monitor LED Full HD 24"</h5>
                <p className="card-text">
                  Disfruta de una calidad de imagen excepcional con este monitor LED Full HD de 24 pulgadas, perfecto para trabajo y entretenimiento.
                </p>
                <div className="mt-auto">
                  <p className="card-text"><strong>S/. 499.00</strong></p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 mb-4 product-card">
            <div className="card h-100">
              <img src="./images/products/keyboard-2.jpg" className="card-img-top" alt="Teclado" />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Teclado Mecánico RGB</h5>
                <p className="card-text">
                  Teclado mecánico con retroiluminación RGB, ideal para gamers y profesionales que buscan un rendimiento superior.
                </p>
                <div className="mt-auto">
                  <p className="card-text"><strong>S/. 299.00</strong></p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 mb-4 product-card">
            <div className="card h-100">
              <img src="./images/products/keyboard-4.jpg" className="card-img-top" alt="Mouse" />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Mouse Inalámbrico</h5>
                <p className="card-text">
                  Mouse inalámbrico ergonómico con alta precisión, ideal para trabajo y juegos.
                </p>
                <div className="mt-auto">
                  <p className="card-text"><strong>S/. 99.00</strong></p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 mb-4 product-card">
            <div className="card h-100">
              <img src="./images/products/keyboard-5.jpg" className="card-img-top" alt="SSD" />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Disco Duro SSD 1TB</h5>
                <p className="card-text">
                  Aumenta la velocidad de tu computadora con este disco duro SSD de 1TB, perfecto para almacenamiento rápido y eficiente.
                </p>
                <div className="mt-auto">
                  <p className="card-text"><strong>S/. 599.00</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;