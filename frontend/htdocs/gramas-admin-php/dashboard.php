<?php
// No necesitas header si usas action en form
// Pero lo dejamos por si quieres usar POST
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    if ($_POST['action'] === 'reportes') {
        header('Location: /gramas-admin-php/reportes.php');
        exit;
    } elseif ($_POST['action'] === 'seguridad') {
        header('Location: /gramas-admin-php/seguridad.php');
        exit;
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Gramas y Suministros</title>
    <link rel="stylesheet" href="/gramas-admin-php/styles.css">
</head>
<body>

    <header class="header">
        <div class="logo">
            <img src="/gramas-admin-php/assets/logo.svg" alt="Logo">
            <span>Gramas y Suministros</span>
        </div>
        <div class="page-title">Administración de Cotizaciones</div>
    </header>

    <div class="container">
        <h1>¿Qué desea hacer?</h1>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 40px;">

            <form action="/gramas-admin-php/reportes.php" method="post">
                <button type="submit" class="btn">Reportes del Sistema</button>
            </form>

            <form action="/gramas-admin-php/seguridad.php" method="post">
                <button type="submit" class="btn">Seguridad y Reportes</button>
            </form>

            <button class="btn" disabled style="opacity: 0.5;">Ventas</button>
            <button class="btn" disabled style="opacity: 0.5;">Productos Más Vendidos</button>
            <button class="btn" disabled style="opacity: 0.5;">Usuarios Registrados</button>
            <button class="btn" disabled style="opacity: 0.5;">Cotizaciones Generadas</button>
            <button class="btn" disabled style="opacity: 0.5;">Pedidos Finales</button>

        </div>
    </div>

</body>
</html>