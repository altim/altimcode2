<?php
	$name = $_REQUEST['name'];
	$email = $_REQUEST['email'];
	$messagebody = $_REQUEST['message'];
	$to = "aleksandartimic@gmail.com";
	$subject = "Email from the website form";

	$message = "Email from website form.\n";
	$message .= "Sent by: ".$name." \n";
	$message .= "Email: ".$email." \n\n";
	$message .= $messagebody;

	mail($to,$subject,$message);
	
	echo "OK";
?>