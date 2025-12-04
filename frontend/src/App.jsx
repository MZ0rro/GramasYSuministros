import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Catalogo from "./pages/Catalogo.jsx";
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import Reportes from './pages/reportes';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/catalogo" element={<Catalogo />} />
      <Route path="/AdminDashboard" element={<AdminDashboard />} />
      <Route path="/reportes" element={<Reportes />} />
    </Routes>
  );
}