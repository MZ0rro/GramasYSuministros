<?php
session_start();
if (!isset($_SESSION["usuario_id"])) {
  header("Location: inicio_sesion.php");
  exit();
}

$nombre = $_SESSION["usuario_nombre"];
$rol = $_SESSION["usuario_rol"]; // 1 = admin
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Panel — Gramas y Suministros</title>
  <link rel="stylesheet" href="estilos/dashboard.css">
  <link rel="icon" type="image/png" href="img/icono.ico" />
  
  <!-- ESTILO PARA EL BOTÓN ADMIN -->
  <style>
    .btn-panel-admin {
      background: #4caf50;
      color: white;
      padding: 12px 25px;
      border-radius: 30px;
      text-decoration: none;
      font-weight: bold;
      font-size: 1rem;
      display: inline-block;
      margin: 15px 0;
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
      transition: 0.3s;
    }
    .btn-panel-admin:hover {
      background: #388e3c;
      transform: translateY(-2px);
    }
  </style>
</head>
<body>
  <header>
    <div class="logo">
      <img src="estilos/logo.png" alt="Logo de Gramas y Suministros">
      <h1>Panel Interno</h1>
    </div>
    <nav>
      <a href="index.php">Catálogo</a>
      <a href="logout.php">Cerrar sesión</a>
    </nav>
  </header>

  <main>
    <h2>Bienvenido, <?php echo htmlspecialchars($nombre); ?></h2>

    <?php if ($rol == 1): ?>
      <p>Rol: Administrador</p>

      <!-- BOTÓN PANEL ADMIN (NUEVO) -->
    <a href="../panel_administrador/dashboard.php" class="btn-panel-admin">
  Panel de Administración
</a>

      <ul>
        <li><a href="admin_inventario.php" style="color: #2e7d32; text-decoration: none;">Gestionar Inventario</a></li>
        <li>Gestionar usuarios</li>
        <li>Ver reportes</li>
      </ul>
    <?php else: ?>
      <p>Rol: Cliente</p>
      <ul>
        <li>Ver mis pedidos</li>
        <li>Consultar cotizaciones</li>
      </ul>
    <?php endif; ?>
  </main>

  <footer>
    © 2025 Gramas y Suministros — Todos los derechos reservados.
  </footer>
</body>
</html>
