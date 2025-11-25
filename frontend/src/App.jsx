import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Contacto from "./pages/Contacto.jsx";
import Register from "./pages/Register.jsx";
import Catalogo from "./pages/Catalogo.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Logout from "./pages/Logout.jsx"
import Perfil from "./pages/Perfil.jsx"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Catalogo />} />
      <Route path="/login" element={<Login />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/perfil" element={<Perfil />} />
    </Routes>
  );
}


