import React from 'react';
import Footer from '../components/Footer';
import '../styles/Productos.css';
import Header from '../components/Header';

const Productos: React.FC = () => {
  return (
    <div className='containerr'>
      <Header />
      <section className="container">
        <h2 style={{ marginTop: '70px' }}>Todos nuestros productos</h2>
        <hr style={{ marginTop: '50px' }} />
        <div className="products" id="productos-container"></div>
      </section>
      <Footer />
    </div>
  );
};

export default Productos;