import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001, // Cambia el puerto si es necesario
  },
  resolve: {
    alias: {
      '@': '/src', // Alias para facilitar las importaciones
    },
  },
});