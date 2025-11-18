
import './App.css'
import {Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
// import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Project from './pages/Project';
import Team from './pages/Team';
import Report from './pages/Report';
import Setting from './pages/Setting';
import { Authprovider } from './AuthContext';
import { ToastContainer } from 'react-toastify';
import { TaskFormProvider } from './Context/TaskFormContext';

function App() {
 

  return (
    <>
    <TaskFormProvider>
    <Authprovider>
     {/* <Navbar/> */}
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route element={<ProtectedRoute />}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/project" element={<Project/>}></Route>
        <Route path="/team" element={<Team/>}></Route>
        <Route path="/report" element={<Report/>}></Route>
        <Route path="/setting" element={<Setting/>}></Route>
      </Routes>
       <ToastContainer />
      </Authprovider>
      </TaskFormProvider>
    </>
  )
}

export default App
