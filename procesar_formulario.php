<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (empty($_POST["name"]) || empty($_POST["email"]) || empty($_POST["asunto"]) || empty($_POST["phone"]) || empty($_POST["message"])) {
        echo "Todos los campos son obligatorios.";
        exit;
    }

    $name = htmlspecialchars(strip_tags($_POST["name"]));
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars(strip_tags($_POST["phone"]));
    $message = htmlspecialchars(strip_tags($_POST["message"]));
    $asunto = htmlspecialchars(strip_tags($_POST["asunto"]));

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "El email no es válido.";
        exit;
    }

    $to = "noobstudioagency@gmail.com";
    $subject = "Nuevo mensaje de contacto de $name";
    $body = "Nombre: $name\nEmail: $email\nTeléfono: $phone\nAsunto: $asunto\nMensaje:\n$message";

    $headers = "From: Orza Construcciones <orza@orzaconstrucciones.com>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Return-Path: orza@orzaconstrucciones.com\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "Mensaje enviado correctamente.";
    } else {
        echo "Error al enviar el mensaje.";
    }
} else {
    echo "Método no permitido.";
}
?>
