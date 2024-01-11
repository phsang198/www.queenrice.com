<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") 
{
    $name = strip_tags(trim($_POST["name"]));
    $prefix = strip_tags(trim($_POST["prefix"]));
    $phone = strip_tags(trim($_POST["phone"]));
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    if (empty($name) || empty($prefix) || empty($phone) || empty($email) || empty($message)) {
        http_response_code(400);
        echo "Please complete all information.";
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Email address is not valid.";
        exit;
    }

    require 'classSimpleMail.php';

    $mail = new SimpleMail('smtp.gmail.com', 587, 'tls');
    $mail->auth('info@queenrice.com', 'password');

    $mail->from('info@queenrice.com', 'Queen Rice Vina Co. Ltd');
    $mail->to($email, $name);

    $mail->subject = 'Thank for your message, we will contact as soon as possible';
    $mail->message = '<h3>My Message</h3>
                    <b>This</b> is a html test message.';

if ($mail->send())
	echo 'Mail sent successfully.';
else
	echo 'Error: ' . $mail->error;
}
?>
