<?php
session_start();
if (!isset($_SESSION['usuario']) || $_SESSION['rol'] !== 'admin') {
    header("Location: ../frontend/inicio_sesion.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Administración de Reportes</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

    <!-- ENCABEZADO -->
    <header class="header">
        <div class="logo">
            <img src="../frontend/estilos/logo.png" alt="Logo">
            <div>
                <span>Gramas y Suministros</span>
                <small>Synthetic Grass</small>
            </div>
        </div>
        <div class="title">Administración de reportes</div>
    </header>

    <!-- TÍTULO -->
    <div class="reportes-title">
        <h1>Reportes del sistema</h1>
    </div>

    <!-- PREGUNTA -->
    <div class="question">
        <h2>¿Qué desea hacer?</h2>
    </div>

    <!-- TARJETAS -->
    <div class="reportes-grid">
        <div class="report-card ventas">
            <div class="icon-ventas"></div>
            <h3>ventas</h3>
        </div>

        <div class="report-card productos">
            <div class="icon-productos"></div>
            <h3>Productos más vendidos</h3>
        </div>

        <div class="report-card usuarios">
            <div class="icon-usuarios"></div>
            <h3>Usuarios registrados</h3>
        </div>

        <div class="report-card cotizaciones">
            <div class="icon-cotizaciones"></div>
            <h3>Cotizaciones generadas</h3>
        </div>

        <div class="report-card pedidos">
            <div class="icon-pedidos"></div>
            <h3>Pedidos finales</h3>
        </div>
    </div>

</body>
</html>