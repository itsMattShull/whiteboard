<?php
//connect to the database so we can check, edit, or insert data to our users table
$conn = new PDO("mysql:host=HOSTNAME;dbname=DATABASE-NAME", USERNAME, "PASSWORD");  
$conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
?>