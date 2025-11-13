<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include("conexion.php");

$sql = "SELECT id, nombre, descripcion, precio, imagen FROM productos";
$result = $conn->query($sql);

$productos = [];
while ($row = $result->fetch_assoc()) {
  $productos[] = $row;
}

echo json_encode($productos);
?>
