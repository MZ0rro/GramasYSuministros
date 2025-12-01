// App.jsx - Configuración principal de rutas
// Define todas las rutas de la aplicación y su protección por roles

import { Routes, Route, Navigate } from "react-router-dom";

// Páginas Públicas
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Contacto from "./pages/Contacto.jsx";

// Páginas de Cliente
import Catalogo from "./pages/Catalogo.jsx";

// Páginas de Administrador
import Dashboard from "./pages/Dashboard.jsx"; // Dashboard general (redirige según rol)
import AdminDashboard from "./pages/AdminDashboard.jsx"; // Panel principal admin
import Usuarios from "./pages/Usuarios.jsx"; // Gestión de usuarios
import Inventario from "./pages/Inventario.jsx"; // Gestión de inventario
import Cotizaciones from "./pages/Cotizaciones.jsx"; // Generador de cotizaciones
import Reportes from "./pages/reportes.jsx"; // Reportes del sistema

// Componentes de Seguridad
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <Routes>
      {/* Ruta por defecto: redirige al login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Rutas Públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/contacto" element={<Contacto />} />

      {/* Rutas Protegidas para Clientes (Rol 2) */}
      <Route
        path="/catalogo"
        element={
          <ProtectedRoute requiredRole={2}>
            <Catalogo />
          </ProtectedRoute>
        }
      />

      {/* Rutas Protegidas para Administradores (Rol 1) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute requiredRole={1}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/panel-admin"
        element={
          <ProtectedRoute requiredRole={1}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/panel-admin/usuarios"
        element={
          <ProtectedRoute requiredRole={1}>
            <Usuarios />
          </ProtectedRoute>
        }
      />

      <Route
        path="/panel-admin/inventario"
        element={
          <ProtectedRoute requiredRole={1}>
            <Inventario />
          </ProtectedRoute>
        }
      />

      <Route
        path="/panel-admin/cotizaciones"
        element={
          <ProtectedRoute requiredRole={1}>
            <Cotizaciones />
          </ProtectedRoute>
        }
      />

      <Route
        path="/panel-admin/reportes"
        element={
          <ProtectedRoute requiredRole={1}>
            <Reportes />
          </ProtectedRoute>
        }
      />

      {/* Ruta para manejar 404 - Redirige al login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}