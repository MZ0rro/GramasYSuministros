import NavComponent from "../components/GlobalNav";

export default function Dashboard() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <h2>No autorizado</h2>;
  }

  return ( 
    <div>
      
      <NavComponent/>
      <h2>Bienvenido al panel</h2>

    </div>
  );

}