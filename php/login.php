<?php
session_start();
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email']);
    $password = $_POST['password'];

    try {
        $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE email = :email LIMIT 1");
        $stmt->execute([':email' => $email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_email'] = $user['email'];
            header("Location: ../index.html"); // redirige al inicio tras login
        } else {
            $_SESSION['error'] = "Correo o contraseña incorrectos.";
            header("Location: ../html/login.html");
        }
    } catch (PDOException $e) {
        $_SESSION['error'] = "Error en el servidor. Inténtalo más tarde.";
        header("Location: ../html/login.html");
    }
}
?>
