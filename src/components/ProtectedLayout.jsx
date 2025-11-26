import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  return (
    <main className="OuterCon">
      <div className="navbar">
        <Navbar />
      </div>
      <div>
        <Outlet />
      </div>
    </main>
  );
};

export default ProtectedLayout;
