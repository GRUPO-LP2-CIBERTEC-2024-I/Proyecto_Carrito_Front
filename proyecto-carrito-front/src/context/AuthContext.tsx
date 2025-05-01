import React, { createContext, useContext, useState } from 'react';

// Definir las interfaces
interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  login: (email: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Crear el proveedor
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const login = (email: string) => {
    setIsAuthenticated(true);
    setUserEmail(email);
  };

  const logout = async () => {
    try {
      //const response = await fetch('http://localhost:8081/logout', {
        const response = await fetch('https://backend-ecommerce-t9cg.onrender.com/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
        setIsAuthenticated(false);
        setUserEmail(null);
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};