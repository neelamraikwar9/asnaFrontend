import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function ProtectedRoute() {
  const { token } = useAuth();
  return (
    <main>
      <div>{token ? <Outlet /> : <Navigate to="/" />}</div>
    </main>
  );
}
