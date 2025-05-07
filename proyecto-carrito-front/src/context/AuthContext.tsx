import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  userEmail: string | null;
  login: (token: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType & { loading: boolean } | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!token;

  // Cargar token del localStorage al iniciar
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      const decoded = decodeToken(storedToken); // si tu token tiene el email
      if (decoded && decoded.email) {
        setUserEmail(decoded.email);
      }
    }
    setLoading(false); // ya cargó
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem('authToken', newToken);
    setToken(newToken);
    const decoded = decodeToken(newToken);
    if (decoded && decoded.email) {
      setUserEmail(decoded.email);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch('https://backend-ecommerce-t9cg.onrender.com/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('token');
        setToken(null);
        setUserEmail(null);
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
<AuthContext.Provider value={{ isAuthenticated, token, userEmail, login, logout, loading }}>
{children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};


// Función auxiliar para decodificar un token JWT
function decodeToken(token: string): any {
  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return null;
  }
}
