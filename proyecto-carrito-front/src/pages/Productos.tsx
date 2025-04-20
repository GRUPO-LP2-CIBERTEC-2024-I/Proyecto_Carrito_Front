import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useCart } from '../context/CartContext';
import '../styles/Productos.css';

// Interfaces para tipado
interface Producto {
  descripcion: string;
  estado: string;
  stock: number;
  idProducto: string;
  precioUnidad: number;
  imagen: string;
}

interface PaginationResponse {
  content: Producto[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}


const Productos: React.FC = () => {
  // Estado para almacenar la respuesta paginada
  const [paginatedData, setPaginatedData] = useState<PaginationResponse | null>(null);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(12);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const { cartItems, total, addToCart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const BASE_URL = "/api/Producto/list";

  const fetchProductos = async (page = 0) => {
    setLoading(true);
    try {
      const url = `${BASE_URL}?page=${page}`;
  
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error al obtener los productos: ${response.statusText}`);
      }
  
      const productos = await response.json();
      
      const paginatedData: PaginationResponse = {
        content: productos,
        pageable: {
          pageNumber: page,
          pageSize: 12,
          sort: {
            empty: true,
            unsorted: true,
            sorted: false
          },
          offset: page * 12,
          paged: true,
          unpaged: false
        },
        last: (page + 1) * 12 >= productos.length,
        totalElements: productos.length,
        totalPages: Math.ceil(productos.length / 12),
        size: 12,
        number: page,
        sort: {
          empty: true,
          unsorted: true,
          sorted: false
        },
        first: page === 0,
        numberOfElements: Math.min(12, productos.length - page * 12),
        empty: productos.length === 0
      };
  
      setPaginatedData(paginatedData);
      // Slice el array para mostrar solo los productos de la página actual
      setProductos(productos.slice(page * 12, (page + 1) * 12));
    } catch (err) {
      console.error('Error completo:', err);
      const error = err as Error;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos(currentPage);
  }, [currentPage, pageSize]);

  const handleCheckout = () => {
    navigate('/comprar');
  };

  const goToPage = (page: number) => {
    if (paginatedData && page >= 0 && page < paginatedData.totalPages) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => {
    if (paginatedData && !paginatedData.last) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (paginatedData && !paginatedData.first) {
      setCurrentPage(prev => prev - 1);
    }
  };

  // Genera los números de página para la paginación
  const getPageNumbers = () => {
    if (!paginatedData) return [];
    
    const totalPages = paginatedData.totalPages;
    const currentPageNum = paginatedData.number;
    const pages = [];
    
    // Muestra máximo 5 números de página
    const startPage = Math.max(0, Math.min(currentPageNum - 2, totalPages - 5));
    const endPage = Math.min(totalPages, startPage + 5);
    
    for (let i = startPage; i < endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className="containerr">
      <Header />
      <section className="content-wrap">
        <h2 style={{ marginTop: '70px', marginLeft: '5%' }}>Todos nuestros productos</h2>
        <hr style={{ marginTop: '50px' }} />
        
        {loading && <div className="loading">Cargando productos...</div>}
        
        <div className="products" id="productos-container">
          {error ? (
            <p style={{ color: 'red' }}>Error: {error}</p>
          ) : productos && productos.length > 0 ? (
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
            !loading && <p>No hay productos disponibles.</p>
          )}
        </div>
        
        {/* Controles de paginación */}
        {paginatedData && paginatedData.totalPages > 1 && (
          <div className="pagination-container">
            <div className="pagination">
              <button 
                onClick={prevPage} 
                disabled={paginatedData.first}
                className={`pagination-button ${paginatedData.first ? 'disabled' : ''}`}
              >
                &laquo; Anterior
              </button>
              
              {getPageNumbers().map(page => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`pagination-button ${paginatedData.number === page ? 'active' : ''}`}
                >
                  {page + 1}
                </button>
              ))}
              
              <button 
                onClick={nextPage} 
                disabled={paginatedData.last}
                className={`pagination-button ${paginatedData.last ? 'disabled' : ''}`}
              >
                Siguiente &raquo;
              </button>
            </div>
            
            <div className="pagination-info">
              Mostrando {paginatedData.pageable.offset + 1} - {paginatedData.pageable.offset + paginatedData.numberOfElements} de {paginatedData.totalElements} productos
            </div>
          </div>
        )}

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