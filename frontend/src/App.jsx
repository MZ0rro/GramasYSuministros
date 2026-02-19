import { Routes, Route } from "react-router-dom";

// CLIENTS PAGES
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Catalogo from "./pages/Catalogo.jsx"
import Perfil from "./pages/Perfil.jsx"
import Logout from "./pages/Logout.jsx"
import ForgotPassword from "./pages/forgot-password.jsx";
import VerifyCode from "./pages/verify-code.jsx";
import ResetPassword from "./pages/reset-password.jsx";

// ADMIN PAGES
import Stock from "./pages/AdminPages/Stock.jsx"
import InsertarProducto from "./pages/AdminPages/ProductInsert.jsx";
import EditarProducto from "./pages/AdminPages/EditProduct.jsx";
import EntradasProductos from "./pages/AdminPages/HistoryInsert.jsx";
import EliminarProducto from "./pages/AdminPages/Remove-Product.jsx";
import Usuarios from "./pages/AdminPages/PRUEBAusuarios.jsx";
import Reportes from "./pages/AdminPages/PRUEBAreportes.jsx"
import Panel from "./pages/AdminPages/Panel.jsx"
import Nosotros from "./pages/Nosotros.jsx"

export default function App() {
  return (
    <Routes>

      {/*CLIENT ROUTES */}
      <Route path="/" element={<Catalogo />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-code" element={<VerifyCode />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/nosotros" element={<Nosotros />} />

      {/*ADMIN ROUTES */}
      <Route path="/stock" element={<Stock />} />
      <Route path="/insertarProducto" element={<InsertarProducto />} />
      <Route path="/editar-producto/:id" element={<EditarProducto />} />
      <Route path="/eliminarProducto" element={<EliminarProducto />} />
      <Route path="/entradasProductos" element={<EntradasProductos />} />
      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="/reportes" element={<Reportes />} />
      <Route path="/panel" element={<Panel />} />
    </Routes>
  );
}