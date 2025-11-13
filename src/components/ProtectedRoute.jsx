import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../AuthContext';
// import Dashboard from '../pages/Dashboard';


export default function ProtectedRoute(){
    const { token } = useAuth();
    return token ? <Outlet /> : <Navigate to="/"/>
}


