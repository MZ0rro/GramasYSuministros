import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Contacto from "./pages/Contacto.jsx";
import Register from "./pages/Register.jsx";
import Catalogo from "./pages/Catalogo.jsx";
import Dashboard from "./pages/Dashboard.jsx";
<<<<<<< HEAD
import Catalogo from "./pages/Catalogo.jsx";
import EliminarProducto from "./pages/EliminarProducto.jsx";
import Historial from "./pages/Historial.jsx";
import InsertarProducto from "./pages/InsertarProducto.jsx";
import Inventario from "./pages/Inventario.jsx";
import Stock from "./pages/Stock.jsx";
=======
import Logout from "./pages/Logout.jsx"
import Perfil from "./pages/Perfil.jsx"

>>>>>>> origin/molina
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Catalogo />} />
      <Route path="/login" element={<Login />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
<<<<<<< HEAD
      <Route path="/EliminarProducto" element={<EliminarProducto />} />
      <Route path="/Historial" element={<Historial />} />
      <Route path="/InsertarProducto" element={<InsertarProducto />} />
      <Route path="/Inventario" element={<Inventario />} />
      <Route path="/Stock" element={<Stock />} />
=======
      <Route path="/logout" element={<Logout />} />
      <Route path="/perfil" element={<Perfil />} />
>>>>>>> origin/molina
    </Routes>
  );
}
