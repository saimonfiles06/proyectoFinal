<?php
include 'conexion.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    $stmt = $conn->prepare("SELECT id, nombre, password, tipo FROM usuarios WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows > 0) {
        $user = $resultado->fetch_assoc();

        if (password_verify($password, $user['password'])) {
            // Guardar datos de sesión
            $_SESSION['usuario_id'] = $user['id'];
            $_SESSION['usuario_nombre'] = $user['nombre'];
            $_SESSION['usuario_tipo'] = $user['tipo'];

            // Redirigir al index tras iniciar sesión correctamente
            header("Location: ../index.html");
            exit();
        } else {
            // Contraseña incorrecta
            echo "<script>alert('Contraseña incorrecta'); window.location.href='../login.html';</script>";
        }
    } else {
        // Usuario no encontrado
        echo "<script>alert('No existe una cuenta con ese correo'); window.location.href='../login.html';</script>";
    }

    $stmt->close();
    $conn->close();
}
?>
