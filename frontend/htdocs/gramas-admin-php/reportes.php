<?php
// Simular datos para el gráfico (hardcodeados)
$fechas = ['01/04/2024', '28/03/2024', '07/04/2024', '10/05/2024'];
$ventas = [200, 250, 500, 350];

// Manejar botón "volver al menu"
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'volver') {
    header('Location: dashboard.php');
    exit;
}

// Manejar "Actualizar" (refresca la página)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'actualizar') {
    header('Location: reportes.php');
    exit;
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reportes del Sistema</title>
    <link rel="stylesheet" href="/gramas-admin-php/styles.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script> <!-- CDN para Chart.js -->
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
        <h1>Reportes del Sistema</h1>

        <div class="card">
            <h2>Ventas por Fecha</h2>
            <div class="chart-container">
                <canvas id="salesChart"></canvas>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Ventas</th>
                        <th>Producto</th>
                    </tr>
                </thead>
                <tbody>
                    <?php for ($i = 0; $i < count($fechas); $i++): ?>
                        <tr>
                            <td><?= $fechas[$i] ?></td>
                            <td><?= $ventas[$i] ?></td>
                            <td><img src="assets/grama-premium.jpg" alt="Grama" width="50"></td>
                        </tr>
                    <?php endfor; ?>
                </tbody>
            </table>

            <form method="post">
                <input type="hidden" name="action" value="actualizar">
                <button type="submit" class="update-btn">Actualizar</button>
            </form>
        </div>
    </div>

    <script>
        const ctx = document.getElementById('salesChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: <?= json_encode($fechas) ?>,
                datasets: [{
                    label: 'Ventas',
                    data: <?= json_encode($ventas) ?>,
                    backgroundColor: '#4caf50',
                    borderColor: '#388e3c',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    </script>

</body>
</html>