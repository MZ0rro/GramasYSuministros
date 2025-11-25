import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Catalogo from './pages/Catalogo.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import Reportes from './pages/reportes.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/catalogo" element={<Catalogo />} />

        {/* TUS RUTAS DEL PANEL ADMIN */}
        <Route path="/panel-admin" element={<AdminDashboard />} />
        <Route path="/panel-admin/reportes" element={<Reportes />} />
      </Routes>
    </Router>
  );
}