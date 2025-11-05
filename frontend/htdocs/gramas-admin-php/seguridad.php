<?php
// Datos simulados para usuarios y reportes
$usuarios = [
    ['email' => 'jhojanab@gmail.com', 'contrasena' => 'Jhojan123', 'rol' => 'Admin'],
    ['email' => 'ejemplo@correo.com', 'contrasena' => 'Pass123', 'rol' => 'Usuario']
];

// Manejar botón "volver al menu"
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'volver') {
    header('Location: dashboard.php');
    exit;
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seguridad y Reportes</title>
    <link rel="stylesheet" href="/gramas-admin-php/styles.css">
</head>
<body>

    <header class="header">
        <form method="post" action="/gramas-admin-php/dashboard.php" style="display:inline;">
    <button type="submit" class="back-btn">Volver al Menú</button>
</form>
        <div class="logo">
            <img src="/gramas-admin-php/assets/logo.svg" alt="Logo">
            <span>Gramas y Suministros</span>
        </div>
        <div class="page-title">Administración de Cotizaciones</div>
        <form method="post" style="display:inline;">
            <input type="hidden" name="action" value="volver">
            <button type="submit" class="back-btn">Volver al Menú</button>
        </form>
    </header>

    <div class="container">
        <h1>Seguridad y Reportes</h1>

        <div class="card">
            <h2>Gestión de Usuarios y Roles</h2>
            <table>
                <thead>
                    <tr>
                        <th>Email / Usuario</th>
                        <th>Contraseña</th>
                        <th>Rol</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($usuarios as $user): ?>
                        <tr>
                            <td><?= $user['email'] ?></td>
                            <td><?= $user['contrasena'] ?></td>
                            <td><?= $user['rol'] ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>

        <div class="card">
            <h2>Reportes (Ventas, Clientes, Inventario, Servicios)</h2>
            <p>Generar reportes aquí (simulado).</p>
            <!-- Agrega más tablas o formas si necesitas -->
        </div>

        <div class="card">
            <h2>Configuración del Sistema / Copias de Seguridad</h2>
            <p>Configuraciones y backups (simulado).</p>
            <button class="btn" onclick="alert('Backup generado!')">Generar Backup</button>
        </div>
    </div>

</body>
</html>