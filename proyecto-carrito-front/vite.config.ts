import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Cambia el puerto si es necesario
    proxy: {
      '/api': {
        target: 'https://backend-ecommerce-t9cg.onrender.com', // URL del backend de produccion
        //target: 'http://localhost:8081', // URL del backend de desarrollo
        changeOrigin: true, // Cambia el origen de la solicitud para evitar problemas de CORS
        rewrite: (path) => path.replace(/^\/api/, ''), // Reescribe la ruta eliminando el prefijo /api
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src', // Alias para facilitar las importaciones
    },
  },
});