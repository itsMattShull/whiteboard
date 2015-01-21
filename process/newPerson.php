<?php
include('connect.php');

$name=$_POST['personName'];
$color=$_POST['personColor'];
$projectID=$_POST['projectID'];

$sql= $conn->prepare('INSERT INTO whiteboard_users (name, color, projectID) VALUES (:name, :color, :projectID)');
$sql->bindParam(':name', $name);
$sql->bindParam(':color', $color);
$sql->bindParam(':projectID', $projectID);
$sql->execute();
?>