export default function Catalogo() {
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("id_rol");

  if (!token) {
    return <h2>No autorizado</h2>;
  }

  if (rol !== "2") {
    return <h2>No tienes permiso para ver esta página</h2>;
  }

  return (
    <div>
      <h1>Catálogo del Cliente</h1>
      <p>Aquí irán los productos, cards, imágenes, etc.</p>
    </div>
  );
}