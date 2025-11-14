<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("conexion.php"); // 👈 se conecta a la base de datos

$sql = "SELECT * FROM usuario";
$resultado = $conexion->query($sql);
$usuario = [];

if ($resultado && $resultado->num_rows > 0) {
  while ($row = $resultado->fetch_assoc()) {
    $usuario[] = $row;
  }
}

echo json_encode($usuario, JSON_UNESCAPED_UNICODE);
?>
