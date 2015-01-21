<?php
include('connect.php');

$title=$_POST['taskTitle'];
$userID=$_POST['taskUserID'];
$description=$_POST['taskDescription'];
$projectID=$_POST['projectID'];
$list = "stories-not-ready";
$itemOrder = "1";
$subOrder="1";

$sql= $conn->prepare('SELECT * FROM whiteboard_users WHERE ID=:userID');
$sql->bindParam(':userID', $userID);
$sql->execute();

$colorRow=$sql->fetch();

$color=$colorRow['color'];

$sql= $conn->prepare('INSERT INTO tasks (title, description, userID, projectID, list, itemOrder, color, subOrder) VALUES (:title, :description, :userID, :projectID, :list, :itemOrder, :color, :subOrder)');
$sql->bindParam(':title', $title);
$sql->bindParam(':description', $description);
$sql->bindParam(':userID', $userID);
$sql->bindParam(':projectID', $projectID);
$sql->bindParam(':list', $list);
$sql->bindParam(':itemOrder', $itemOrder);
$sql->bindParam(':color', $color);
$sql->bindParam(':subOrder', $subOrder);
$sql->execute();

$taskID = $conn->lastInsertId();

echo json_encode(array(id=>$taskID, title=>$title, description=>$description, userID=>$userID, "list"=>$list, order=>$itemOrder, color=>$color));
?>