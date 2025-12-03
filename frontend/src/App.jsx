// App.jsx - Configuración principal de rutas
import { Routes, Route, Navigate } from "react-router-dom";

// Páginas Públicas
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Contacto from "./pages/Contacto.jsx";
import QuienesSomos from "./pages/QuienesSomos.jsx"; // Nueva página

// Páginas de Cliente
import Catalogo from "./pages/Catalogo.jsx";

// Páginas de Administrador
import Dashboard from "./pages/Dashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Usuarios from "./pages/Usuarios.jsx";
import Inventario from "./pages/Inventario.jsx";
import Cotizaciones from "./pages/Cotizaciones.jsx";
import Reportes from "./pages/reportes.jsx";

// Componentes de Seguridad
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <Routes>
      {/* Ruta principal: muestra Home público */}
      <Route path="/" element={<Home />} />

      {/* Rutas Públicas */}
      <Route path="/quienes-somos" element={<QuienesSomos />} />
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

      {/* Ruta para manejar 404 - Redirige a Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}