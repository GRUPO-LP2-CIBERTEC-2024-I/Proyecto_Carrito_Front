import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{ backgroundColor: 'rgb(18, 33, 61)', color: 'white', padding: '20px 0', marginTop: '200px' }}>
      <div className="container">
        <div className="row">
          {/* Marcas patrocinadoras */}
          <div className="col-md-4">
            <h5>Marcas Patrocinadoras</h5>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>Samsung</li>
              <li>Logitech</li>
              <li>Intel</li>
              <li>AMD</li>
            </ul>
          </div>

          {/* Enlaces */}
          <div className="col-md-4">
            <h5>Enlaces</h5>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>
                <a href="/quienessomos" style={{ color: 'white', textDecoration: 'none' }}>
                  Quiénes somos
                </a>
              </li>
              <li>
                <a href="/productos" style={{ color: 'white', textDecoration: 'none' }}>
                  Productos
                </a>
              </li>
              <li>
                <a href="/contacto" style={{ color: 'white', textDecoration: 'none' }}>
                  Contáctanos
                </a>
              </li>
            </ul>
          </div>

          {/* Contáctanos */}
          <div className="col-md-4">
            <h5>Contáctanos</h5>
            <p>Email: contacto@tienda.com</p>
            <p>Teléfono: +51 987 654 321</p>
            <p>Dirección: Av. Tecnológica 123, Lima, Perú</p>
          </div>
        </div>

        <hr style={{ backgroundColor: 'white', margin: '20px 0' }} />

        {/* Derechos reservados */}
        <div className="text-center">
          <p style={{ margin: 0 }}>© 2025 Proyecto Integrador - Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;