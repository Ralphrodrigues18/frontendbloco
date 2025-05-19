import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Tenta recuperar o token e user do localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token }); // aqui você pode melhorar pegando dados do token decodificado
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
