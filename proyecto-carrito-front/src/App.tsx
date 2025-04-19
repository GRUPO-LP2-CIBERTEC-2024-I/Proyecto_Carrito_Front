import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Registro from './pages/Registro';
import QuienesSomos from './pages/QuienesSomos';
import VerMiInformacion from './pages/VerMiInformacion';
import VerMisPedidos from './pages/VerMisPedidos';
import VerDetallesPedido from './pages/VerDetallesPedido';
import Comprar from './pages/Comprar';
import Productos from './pages/Productos'; // Importa el componente Productos
import './App.css'; // Estilos específicos de App

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/quienessomos" element={<QuienesSomos />} />
          <Route path="/verMiInformacion" element={<VerMiInformacion />} />
          <Route path="/verMisPedidos" element={<VerMisPedidos />} />
          <Route path="/verDetallesPedido" element={<VerDetallesPedido />} />
          <Route path="/comprar" element={<Comprar />} />
          <Route path="/productos" element={<Productos />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;