<?php
include('connect.php');

$projectID=$_GET['projectID'];

$sql= $conn->prepare('SELECT * FROM whiteboard_users WHERE projectID=:projectID');
$sql->bindParam(':projectID', $projectID);
$sql->execute();

$peopleList = array();

while ($row=$sql->fetch()) {
	$personID = $row['ID'];
	$personName = $row['name'];
	$personColor = $row['color'];

	$peopleList[]=array(id=>$personID, name=>$personName, color=>$personColor);
}

echo json_encode(array(people=>$peopleList));
?>