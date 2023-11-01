import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"

export const PrivateRoutes = () => {
    const { autenticado } = useAuth();
    return autenticado ? <Outlet /> : <Navigate to={'/login'} />;
}
