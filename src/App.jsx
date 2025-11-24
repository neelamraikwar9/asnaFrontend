import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
// import Navbar from './components/Navbar';
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Project from "./pages/Project";
import Team from "./pages/Team";
import Report from "./pages/Report";
import Setting from "./pages/Setting";
import { Authprovider } from "./AuthContext";
import { ToastContainer } from "react-toastify";
import { TaskFormProvider } from "./Context/TaskFormContext";
import TaskDetail from "./pages/TaskDetail";
import Signup from "./pages/Signup";
import ProtectedLayout from "./components/ProtectedLayout";

function App() {
  return (
    <>
      <Authprovider>
        <TaskFormProvider>
         
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>

            <Route element={<ProtectedRoute />}>
            <Route element={<ProtectedLayout/>}>
             <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/project" element={<Project />}></Route>
            <Route path="/task/:taskId" element={<TaskDetail />}></Route>
            <Route path="/team" element={<Team />}></Route>
            <Route path="/report" element={<Report />}></Route>
            <Route path="/setting" element={<Setting />}></Route>
            </Route> 
            </Route>
          </Routes>
          <ToastContainer />
        </TaskFormProvider>
      </Authprovider>
    </>
  );
}

export default App;
