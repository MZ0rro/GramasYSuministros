import { Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import Login from "./pages/inicio_sesion";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/iniciosesion" element={<Login />} />
    </Routes>
  );
}

export default App;
