<?php
include('connect.php');

$title=$_POST['taskTitle'];
$userID=$_POST['taskUserID'];
$description=$_POST['taskDescription'];
$taskID=$_POST['taskID'];

$sql= $conn->prepare('SELECT * FROM whiteboard_users WHERE ID=:userID');
$sql->bindParam(':userID', $userID);
$sql->execute();

$colorRow=$sql->fetch();

$color=$colorRow['color'];

$sql= $conn->prepare('UPDATE tasks SET title=:title, userID=:userID, description=:description, color=:color WHERE ID=:taskID');
$sql->bindParam(':title', $title);
$sql->bindParam(':userID', $userID);
$sql->bindParam(':description', $description);
$sql->bindParam(':taskID', $taskID);
$sql->bindParam(':color', $color);
$sql->execute();

echo $color;
?>