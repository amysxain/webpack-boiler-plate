<?php


    // Site owner
    $to = $_POST['site_receiver_email'];
    $email_subject = $_POST['mail_subject'];
    $email_noreply = $_POST['email_noreply'];
    
    // Email sender
    $sender = $_POST['Email'];
    $sender_subject = $_POST['sender_subject'];
    $sender_email_body = $_POST['sender_email_body'];

    $data = $_POST;

    $removeKeys = array('site_receiver_email', 'mail_subject', 'email_noreply', 'mail_heading', 'sender_subject', 'sender_email_body');
    $data = array_diff_key($data, array_flip($removeKeys));

    $email_body = '<h1 style="font-size:24px;">'. $_POST['mail_heading'] .'</h1>';
    $email_body .='<ul>';
    foreach ($data as $title => $val){
        $email_body .= '<li>'. $title .' : <strong>'. $val .'</strong></p>';
    }
    $email_body .= '</ul>';

    $headers .= "Reply-To: '. $email_noreply .' \r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    mail($to,$email_subject,$email_body,$headers);
    mail($sender,$sender_subject,$sender_email_body,$headers);
