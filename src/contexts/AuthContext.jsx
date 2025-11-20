import { createContext, useContext, useState, useEffect } from "react";

// Criação do contexto
const AuthContext = createContext();

// Hook para usar o contexto
export function useAuth() {
  return useContext(AuthContext);
}

const DUMMY_TOKEN = 'token_falso_para_teste_12345';

// Provider do contexto
export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    // Busca token do sessionStorage ao iniciar
    return sessionStorage.getItem("token") || DUMMY_TOKEN;
  });

  // Salva no sessionStorage sempre que token mudar
  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", token);
    } else {
      sessionStorage.removeItem("token");
    }
  }, [token]);

  // Função para login
  function login(newToken) {
    setToken(newToken);
  }

  // Função para logout
  function logout() {
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}