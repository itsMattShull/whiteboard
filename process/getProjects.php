<?php
include('connect.php');

$one="1";

$sql= $conn->prepare('SELECT * FROM projects WHERE active=:one');
$sql->bindParam(':one', $one);
$sql->execute();

$projectsList = array();

while ($row=$sql->fetch()) {
	$projectID = $row['ID'];
	$projectName = $row['name'];
	$projectProducer = $row['producer'];

	$projectsList[]=array(id=>$projectID, name=>$projectName, producer=>$projectProducer);
}

echo json_encode(array(projects=>$projectsList));
?>