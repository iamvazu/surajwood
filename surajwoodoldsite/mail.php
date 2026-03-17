<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include PHPMailer files
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';
require 'phpmailer/src/Exception.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $address = htmlspecialchars($_POST['address']);
    $mobile = htmlspecialchars($_POST['phone']);
    $message = htmlspecialchars($_POST['message']);

    // Recipient Email
    $to = "sales@surajwood.com"; 
    $mail = new PHPMailer(true);

    try{
        $mail -> isSMTP();
        $mail -> Host = "smtp.gmail.com";
        $mail -> SMTPAuth = true;
        $mail -> Username = "himanshuwork806@gmail.com";
        $mail -> Password = "edvc kgsd yufe cwyf";
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Sender and Recipient Settings
        $mail->setFrom($email, $name); // Sender's email and name
        $mail->addAddress($to, 'Surajwood'); // Recipient's email and name
    
        // Email Content
        $mail->isHTML(false); // Use plain text format
        $mail->Subject = "New Enquiry";
        $mail->Body = "You have received a new enquiry. Here are the details:\n\n";
        $mail->Body .= "Name: $name\n";
        $mail->Body .= "Email: $email\n";
        $mail->Body .= "Address: $address\n";
        $mail->Body .= "Mobile: $mobile\n";
        $mail->Body .= "Message: $message\n";
        // Send Email
        
        // Send the email
        if ($mail->send()) {
            echo "<script>
                alert('Your enquiry has been sent successfully.');
                window.location.href = 'index.php';
            </script>";
            header("Location: thankyou.php"); // Redirect to your page
            exit(); // Important to stop further script execution
        } else {
            echo "<script>
                alert('Sorry, there was an error sending your enquiry. Please try again later.');
                window.location.href = 'index.php';
            </script>";
            header("Location: thankyou.php"); // Redirect to error page
            exit();
        }
    }catch (Exception $e) {
        echo "Sorry, there was an error sending your enquiry. Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    echo "Invalid request method.";
}
?>
