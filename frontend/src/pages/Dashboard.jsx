export default function Dashboard() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <h2>No autorizado</h2>;
  }

  return <h2>Bienvenido al panel</h2>;
}
