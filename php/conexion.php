<?php
$servername = "localhost";
$username = "root";
$password = ""; // o tu contraseña
$dbname = "granCasino";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Error de conexión: " . $conn->connect_error);
}
?>
