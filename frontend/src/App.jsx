import { Routes, Route } from "react-router-dom";

// CLIENTS PAGES
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Catalogo from "./pages/Catalogo.jsx"
import Perfil from "./pages/Perfil.jsx"
import Contacto from "./pages/Contacto.jsx"
import Logout from "./pages/Logout.jsx"
import ForgotPassword from "./pages/forgot-password.jsx";
import VerifyCode from "./pages/verify-code.jsx";
import ResetPassword from "./pages/reset-password.jsx";

// ADMIN PAGES
import Dashboard from "./pages/AdminPages/Dashboard.jsx";
import Stock from "./pages/AdminPages/Stock.jsx"
import InsertarProducto from "./pages/AdminPages/ProductInsert.jsx";
import EntradasProductos from "./pages/AdminPages/HistoryInsert.jsx"

export default function App() {
  return (
    <Routes>

      {/*CLIENT ROUTES */}
      <Route path="/" element={<Catalogo />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-code" element={<VerifyCode />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/logout" element={<Logout />} />

      {/*ADMIN ROUTES */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/stock" element={<Stock />} />
      <Route path="/insertarProducto" element={<InsertarProducto />} />
      <Route path="/entradasProductos" element={<EntradasProductos />} />
    </Routes>
  );
}