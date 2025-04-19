import React from 'react';
import Footer from '../components/Footer';
import '../styles/QuienesSomos.css'; // Mueve los estilos en línea a este archivo
import Header from '../components/Header';

const QuienesSomos: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="container" style={{ marginTop: '100px' }}>
        <h2 className="text-center" style={{ marginBottom: '70px' }}>¿Quiénes somos?</h2>
        <p className="text-center" style={{ marginBottom: '70px' }}>
          Somos un grupo de apasionados por la tecnología, dedicados a ofrecer productos tecnológicos importados de la más alta calidad. Nuestro objetivo es proporcionar a nuestros clientes las mejores opciones del mercado, garantizando satisfacción y excelencia en cada compra.
        </p>
        <hr style={{ margin: '100px 0px 100px 0px' }} />

        <h3 className="text-center" style={{ marginBottom: '50px' }}>Desarrolladores</h3>
        <div className="row text-center">
          {[
            { name: 'Jhon Quiñones', img: '/images/hackersecreto.jpg' },
            { name: 'Cristopher Ortega', img: '/images/hacker.jpg' },
            { name: 'Gianfranco Portillo', img: '/images/hacker.jpg' },
            { name: 'Moises Aguirre', img: '/images/hacker.jpg' },
            { name: 'Antony Trejo', img: '/images/hacker.jpg' },
          ].map((dev, index) => (
            <div className="col-md-4" key={index}>
              <div className="card mb-4">
                <img src={dev.img} className="card-img-top" alt={`Desarrollador ${index + 1}`} />
                <div className="card-body">
                  <h5 className="card-title">{dev.name}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default QuienesSomos;