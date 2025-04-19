import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{ backgroundColor: 'rgb(18, 33, 61)', height: '100px', marginTop: '200px' }}>
      <p className="author" style={{ color: 'white', display: 'inline-block', marginLeft: '50%' }}>
        Proyecto
      </p>
    </footer>
  );
};

export default Footer;