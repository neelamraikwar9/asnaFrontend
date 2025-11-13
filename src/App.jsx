
import './App.css'
import {Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { Authprovider } from './AuthContext';

function App() {
 

  return (
    <>
    <Authprovider>
     {/* <Navbar/> */}
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
         <Route element={<ProtectedRoute />}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
      </Routes>
      </Authprovider>
    </>
  )
}

export default App
