import React, { useEffect, useState } from 'react';
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

type Categoria = 'Teclados' | 'Impresoras' | 'Monitores' | 'Laptops' | 'Mouses' | 'Consolas';

// 2. Tipa el objeto con ese tipo
const categorias: Record<Categoria, string[]> = {
  Teclados: ['teclado', 'keyboard'],
  Impresoras: ['impresora', 'printer'],
  Monitores: ['monitor', 'pantalla'],
  Laptops: ['laptop', 'notebook', 'portátil'],
  Mouses: ['mouse', 'ratón'],
  Consolas: ['Consola'],
};


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
  const [notification, setNotification] = useState<string | null>(null);


  const [allProductos, setAllProductos] = useState<Producto[]>([]);
  const [nombreFiltro, setNombreFiltro] = useState('');
  const [precioMax, setPrecioMax] = useState<number | undefined>(undefined);
  const [precioMin, setPrecioMin] = useState<number | undefined>(undefined);

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<Categoria | "">("");


  const {addToCart} = useCart();


  const BASE_URL = "/api/Producto/list";

  const fetchProductos = async (page = 0) => {
    setLoading(true);
    try {
      const url = `${BASE_URL}?page=${page}`;
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Error al obtener los productos: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      // Ahora data es el objeto paginado completo
      setPaginatedData(data);
      setAllProductos(data.content);
      setProductos(data.content);
  
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


  {/* Filtros Logica */}
  const handleFilter = () => {
    let filtrados = allProductos;

    if (nombreFiltro.trim() !== '') {
      filtrados = filtrados.filter(producto =>
          producto.descripcion.toLowerCase().includes(nombreFiltro.toLowerCase())
      );
    }

    if (precioMin !== undefined && !isNaN(precioMin)) {
      filtrados = filtrados.filter(producto => producto.precioUnidad >= precioMin);
    }

    if (precioMax !== undefined && !isNaN(precioMax)) {
      filtrados = filtrados.filter(producto => producto.precioUnidad <= precioMax);
    }
    if (categoriaSeleccionada !== "") {
      const palabrasClave = categorias[categoriaSeleccionada as Categoria]; // Sin error
      filtrados = filtrados.filter(producto =>
          palabrasClave.some(palabra =>
              producto.descripcion.toLowerCase().includes(palabra.toLowerCase())
          )
      );
    }

    const start = currentPage * pageSize;
    const end = start + pageSize;
    setProductos(filtrados.slice(start, end));

    setPaginatedData({
      content: filtrados,
      pageable: {
        pageNumber: currentPage,
        pageSize: pageSize,
        sort: { empty: true, sorted: false, unsorted: true },
        offset: start,
        paged: true,
        unpaged: false,
      },
      last: end >= filtrados.length,
      totalElements: filtrados.length,
      totalPages: Math.ceil(filtrados.length / pageSize),
      size: pageSize,
      number: currentPage,
      sort: { empty: true, sorted: false, unsorted: true },
      first: currentPage === 0,
      numberOfElements: Math.min(pageSize, filtrados.length - start),
      empty: filtrados.length === 0,
    });
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

  const getPageNumbers = () => {
    if (!paginatedData) return [];

    const totalPages = paginatedData.totalPages;
    const currentPageNum = paginatedData.number;
    const pages = [];

    const startPage = Math.max(0, Math.min(currentPageNum - 2, totalPages - 5));
    const endPage = Math.min(totalPages, startPage + 5);

    for (let i = startPage; i < endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const handleAddToCart = (producto: Producto) => {
    addToCart({
      id: producto.idProducto,
      name: producto.descripcion,
      price: producto.precioUnidad,
      image: producto.imagen,
      quantity: 1,
    });
    setNotification(`Producto "${producto.descripcion}" agregado al carrito.`); // Muestra la notificación
    setTimeout(() => setNotification(null), 3000); // Oculta la notificación después de 3 segundos
  };


  return (
    <div className="containerr">
      <Header />
      <section className="content-wrap">
        <h2 style={{ marginTop: '70px', marginLeft: '5%' }}>Todos nuestros productos</h2>
        <hr style={{ marginTop: '50px' }} />

        {/* Filtro */}
        <h2 style={{ marginTop: '70px', marginLeft: '5%', fontSize: '24px', fontWeight: 'bold' }}>Filtrar por...</h2>

        <div style={{
          display: 'flex',
          gap: '25px',
          marginLeft: '5%',
          marginTop: '20px',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '220px' }}>
            <label htmlFor="nombreFiltro" style={{
              marginBottom: '5px',
              fontSize: '16px',
              fontWeight: '500'
            }}>
              Nombre
            </label>
            <input
                id="nombreFiltro"
                type="text"
                placeholder="Nombre del producto"
                value={nombreFiltro}
                onChange={(e) => setNombreFiltro(e.target.value)}
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  minWidth: '180px',
                  fontSize: '16px',
                  transition: 'border-color 0.3s ease',
                }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', width: '220px' }}>
            <label htmlFor="precioMin" style={{
              marginBottom: '5px',
              fontSize: '16px',
              fontWeight: '500'
            }}>
              Precio Mínimo
            </label>
            <input
                id="precioMin"
                type="number"
                placeholder="Precio mínimo"
                value={precioMin !== undefined ? precioMin : ''}
                onChange={(e) => setPrecioMin(e.target.value ? Number(e.target.value) : undefined)}
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  minWidth: '180px',
                  fontSize: '16px',
                  transition: 'border-color 0.3s ease',
                }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', width: '220px' }}>
            <label htmlFor="precioMax" style={{
              marginBottom: '5px',
              fontSize: '16px',
              fontWeight: '500'
            }}>
              Precio Máximo
            </label>
            <input
                id="precioMax"
                type="number"
                placeholder="Precio máximo"
                value={precioMax !== undefined ? precioMax : ''}
                onChange={(e) => setPrecioMax(e.target.value ? Number(e.target.value) : undefined)}
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  minWidth: '180px',
                  fontSize: '16px',
                  transition: 'border-color 0.3s ease',
                }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', width: '220px' }}>
            <label htmlFor="categoriaSeleccionada" style={{
              marginBottom: '5px',
              fontSize: '16px',
              fontWeight: '500'
            }}>
              Categoría
            </label>
            <select
                id="categoriaSeleccionada"
                value={categoriaSeleccionada}
                onChange={(e) => setCategoriaSeleccionada(e.target.value as Categoria | "")}
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  minWidth: '180px',
                  fontSize: '16px',
                  transition: 'border-color 0.3s ease',
                }}
            >
              <option value="">-- Todos --</option>
              {Object.keys(categorias).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <button
              onClick={handleFilter}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'background-color 0.3s ease',
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
          >
            Filtrar
          </button>
        </div>


        {/* Fetch */}
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
                    onClick={() => handleAddToCart(producto)} // Usar la función para agregar al carrito
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
      </section>
      {notification && (
          <div className="notification">
            {notification}
          </div>
      )}

      <Footer />
    </div>
  );
};

export default Productos;