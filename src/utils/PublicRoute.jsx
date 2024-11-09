import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";


export const PublicRoute = () => {
    const { isLoggedIn } = useAuth();
    return isLoggedIn() ? <Navigate to="/home"/> : <Outlet/>
}