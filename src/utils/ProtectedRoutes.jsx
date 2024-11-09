import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";


const ProtectedRoutes = () => {
    const { isLoggedIn } = useAuth();
    return isLoggedIn() ? <Outlet/> : <Navigate to="/login"/>
}

export default ProtectedRoutes;