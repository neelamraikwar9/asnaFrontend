import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Navbar from "./Navbar";


export default function ProtectedRoute() {
  const { token } = useAuth();
  return(
    <main  className="OuterCon">
     <div className="navbar">
        <Navbar />
      </div>
    <div>
     {token ? <Outlet /> : <Navigate to="/"/>}
   </div>
   </main>
  )
}
