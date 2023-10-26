<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require "phpmailer/src/Exception.php";
require "phpmailer/src/PHPMailer.php";
require "phpmailer/src/SMTP.php";


    $mail = new PHPMailer(true);

    $mail->isSMTP();
    $mail->Host = "smtp.gmail.com";
    $mail->SMTPAuth = true;
    $mail->Username = "inacokey@gmail.com"; 
    $mail->Password = "bjfu nmsa ixbr fxoq";
    $mail->SMTPSecure = "ssl";
    $mail->Port = 465;

    $mail->setFrom($_POST["email"]);

    $mail->addAddress("inacokey@gmail.com");

    $senderEmail = $_POST['email'];  
    $phone = $_POST['number'];        
    $name = $_POST['name'];         
    $message = $_POST['msg'];   

    $mail->isHTML(true);
    $mail->setLanguage('pl', './phpmailer/language/');
    $mail->CharSet = 'UTF-8';


    $mail->Subject = 'Wiadomość wysłana z formularza ze Strony Pan Ekspres';
    $mail->Body = "E-mail od: $senderEmail<br>Imię i nazwisko: $name<br>Numer telefonu: $phone<br><br>$message";


    if ($mail->send()) {
        header("Location: /index.html?mail_status=sent#contact");
    } else {
        header("Location: /index.html?mail_status=error");
    }

?>