import { Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import Login from "./pages/inicio_sesion";
import Stock from "./pages/Stock";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/iniciosesion" element={<Login />} />
      <Route path="/Stock" element={<Stock />} />
    </Routes>
  );
}

export default App;
