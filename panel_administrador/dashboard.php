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
    <title>Panel de Administración</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header class="header">
        <div class="logo">
            <img src="../frontend/estilos/logo.png" alt="Logo">
            <div>
                <span>Gramas y Suministros</span>
                <small>Synthetic Grass</small>
            </div>
        </div>
        <div class="title">Panel de administración</div>
        <div class="user-icon">
            <div class="icon-circle"></div>
        </div>
    </header>

    <div class="greeting">
        <h1>¡Hola (<?= htmlspecialchars($nombre) ?>)!</h1>
        <a href="../frontend/dashboard.php" class="btn-volver">Volver</a>
    </div>

    <div class="question">
        <h2>¿Qué desea hacer?</h2>
    </div>

    <div class="options">
        <div class="card">
            <div class="icon-user"></div>
            <h3>Control de usuarios</h3>
        </div>
        <div class="card">
            <div class="icon-inventory"></div>
            <h3>Administrar inventarios</h3>
        </div>
        <div class="card">
            <div class="icon-quote"></div>
            <h3>Generar Cotizaciones</h3>
        </div>
    </div>

    <div class="reportes-container">
        <a href="reportes.php" class="btn-reportes">Ir a reportes</a>
    </div>
</body>
</html>