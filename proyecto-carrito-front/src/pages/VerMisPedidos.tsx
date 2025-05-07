import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { apiFetch } from '../api'; // Asegúrate de que esta ruta sea correcta

// Definimos una interfaz para tipar cada venta correctamente
interface Venta {
    idVenta: number;
    monto: number;
    fechaVenta: string;
    pago: never;       // Puedes reemplazar con un tipo específico si sabes su estructura
    pedido: never;     // Igual aquí
    detalles: never[]; // Y aquí también
    paymentId: string | null;
}

const VerMisPedidos: React.FC = () => {
    const [ventas, setVentas] = useState<Venta[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const data: Venta[] = await apiFetch('/api/Venta/mis-ventas', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (Array.isArray(data)) {
                    setVentas(data);
                    alert(`Número de ventas: ${data.length}`);
                } else {
                    alert('La respuesta no es una lista');
                }
            } catch (error) {
                setError('Error al cargar las ventas');
                console.error(error);
            }
        };

        fetchPedidos();
    }, []);

    return (
        <div className="containerr">
            <Header />
            <div className="container mt-5">
                <h2 style={{ marginBottom: '50px', marginTop: '100px' }}>Mis Pedidos</h2>

                {error && <p className="text-danger">{error}</p>}

                {ventas.length === 0 && !error ? (
                    <p>No tienes pedidos aún.</p>
                ) : (
                    ventas.map((venta) => (
                        <div className="card mb-3" key={venta.idVenta}>
                            <div className="card-body">
                                <h5 className="card-title">Venta #{venta.idVenta}</h5>
                                <p className="card-text">Monto: S/ {venta.monto}</p>
                                <p className="card-text">Fecha: {venta.fechaVenta}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <Footer />
        </div>
    );
};

export default VerMisPedidos;
