<?php
// php/conexion.php
$host = "localhost";
$user = "root";
$pass = "";
$db = "granCasino"; // Cambia por el nombre de tu BD

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

$conn->set_charset("utf8mb4");
?>
