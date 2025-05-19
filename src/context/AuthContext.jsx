import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Inicializa o user já com o token do localStorage, se existir
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? { token } : null;
  });

  useEffect(() => {
    // Mantém para casos em que o token pode mudar em outro local
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token });
    }
  }, []);

  function login(token) {
    localStorage.setItem('token', token);
    setUser({ token });
  }

  function logout() {
    localStorage.removeItem('token');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}