<?php
session_start();
if (!isset($_SESSION['usuario_id']) || $_SESSION['usuario_rol'] != 1) {
    header("Location: ../frontend/inicio_sesion.php");
    exit();
}
$nombre = $_SESSION['usuario_nombre'];
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Administración de Reportes</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="reportes.css">
</head>
<body>

    <!-- ENCABEZADO -->
    <header class="reportes-header">
        <div class="logo">
            <img src="../frontend/estilos/logo.png" alt="Logo">
            <div>
                <span>Gramas y Suministros</span>
                <small>Synthetic Grass</small>
            </div>
        </div>
        <div class="reportes-title">Administración de reportes</div>
        <div class="user-icon">
            <div class="icon-circle"></div>
        </div>
    </header>

    <!-- SALUDO -->
    <div class="reportes-greeting">
        <h1>Reportes del sistema</h1>
    </div>

    <!-- PREGUNTA -->
    <div class="reportes-question">
        <h2>¿Qué desea hacer?</h2>
    </div>

    <!-- OPCIONES -->
    <div class="reportes-options">
        <div class="reportes-card">
            <div class="icon-ventas"></div>
            <h3>ventas</h3>
        </div>
        <div class="reportes-card">
            <div class="icon-productos"></div>
            <h3>Productos mas vendidos</h3>
        </div>
        <div class="reportes-card">
            <div class="icon-usuarios"></div>
            <h3>Usuarios registrados</h3>
        </div>
        <div class="reportes-card">
            <div class="icon-cotizaciones"></div>
            <h3>Cotizaciones generadas</h3>
        </div>
        <div class="reportes-card">
            <div class="icon-pedidos"></div>
            <h3>Pedidos finales</h3>
        </div>
    </div>

</body>
</html>