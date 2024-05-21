<?php
use PHPMailer\PHPMailer\PHPMailer;

require_once 'contact/phpmailer/Exception.php';
require_once 'contact/phpmailer/PHPMailer.php';
require_once 'contact/phpmailer/SMTP.php';

$mail = new PHPMailer(true);

header("Access-Control-Allow-Origin: *"); // Allow requests from any origin
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allow specific HTTP methods
header("Access-Control-Allow-Headers: Content-Type"); // Allow specific headers

if ($_SERVER["REQUEST_METHOD"] == "POST") 
{
    $name = strip_tags(trim($_POST["name"]));
    $prefix = strip_tags(trim($_POST["prefix"]));
    $phone = strip_tags(trim($_POST["phone"]));
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    try{
        print "Hello, World!";
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'phsang198@gmail.com'; // Gmail address which you want to use as SMTP server
        $mail->Password = 'Sang1998'; // Gmail address Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = '587';
    
        $mail->setFrom('phsang198@gmail.com'); // Gmail address which you used as SMTP server
        $mail->addAddress('phsang198@gmail.com'); // Email address where you want to receive emails (you can use any of your gmail address including the gmail address which you used as SMTP server)
    
        $mail->isHTML(true);
        $mail->Subject = 'Message Received (Contact Page)';
        $mail->Body = "<h3>Name : $name <br>Email: $email <br>Message : $message</h3>";
    
        $mail->send();
      } 
      catch (Exception $e)
      {
      }
}
?>
