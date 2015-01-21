<?php
include('connect.php');

$itemID=$_GET['itemID'];

$sql= $conn->prepare('SELECT * FROM tasks WHERE ID=:id');
$sql->bindParam(':id', $itemID);
$sql->execute();

$row=$sql->fetch();

$taskID = $row['ID'];
$title = $row['title'];
$description = $row['description'];
$userID = $row['userID'];
$list = $row['list'];
$itemOrder = $row['itemOrder'];
$color = $row['color'];

echo json_encode(array(id=>$taskID, title=>$title, description=>$description, userID=>$userID, "list"=>$list, order=>$itemOrder, color=>$color));
?>