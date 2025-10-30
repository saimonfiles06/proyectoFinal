<?php
session_start();
require_once 'db.php'; // archivo con conexión PDO

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirm_password'];

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $_SESSION['error'] = "Correo electrónico inválido.";
        header("Location: ../html/registro.html");
        exit;
    }

    if (strlen($password) < 6) {
        $_SESSION['error'] = "La contraseña debe tener al menos 6 caracteres.";
        header("Location: ../html/registro.html");
        exit;
    }

    if ($password !== $confirmPassword) {
        $_SESSION['error'] = "Las contraseñas no coinciden.";
        header("Location: ../html/registro.html");
        exit;
    }

    // Hasheamos la contraseña
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    try {
        $stmt = $pdo->prepare("INSERT INTO usuarios (email, password) VALUES (:email, :password)");
        $stmt->execute([
            ':email' => $email,
            ':password' => $hashedPassword
        ]);
        $_SESSION['success'] = "Cuenta creada correctamente. Por favor inicia sesión.";
        header("Location: ../html/login.html");
    } catch (PDOException $e) {
        if ($e->getCode() == 23000) { // email duplicado
            $_SESSION['error'] = "El correo electrónico ya está registrado.";
        } else {
            $_SESSION['error'] = "Error en el servidor. Inténtalo más tarde.";
        }
        header("Location: ../html/registro.html");
    }
}
?>
