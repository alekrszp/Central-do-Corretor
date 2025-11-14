import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export function PrivateRoute({ children }) {
  const { token } = useAuth();

  // Se não estiver logado, redireciona para login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Se estiver logado, renderiza o componente filho
  return children;
}