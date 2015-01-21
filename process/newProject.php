<?php
include('connect.php');

$name=$_POST['projectName'];
$producer=$_POST['projectProducer'];

$sql= $conn->prepare('INSERT INTO projects (name, producer) VALUES (:name, :producer)');
$sql->bindParam(':name', $name);
$sql->bindParam(':producer', $producer);
$sql->execute();

$sql= $conn->prepare('SELECT * FROM projects WHERE name=:name AND producer=:producer');
$sql->bindParam(':name', $name);
$sql->bindParam(':producer', $producer);
$sql->execute();

$row=$sql->fetch();

$id=$row['ID'];

echo $id;
?>