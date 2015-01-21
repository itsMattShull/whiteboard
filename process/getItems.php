<?php
include('connect.php');

$projectID=$_GET['projectID'];

$sql= $conn->prepare('SELECT * FROM tasks WHERE projectID=:projectID ORDER BY itemOrder, subOrder, datetime ASC');
$sql->bindParam(':projectID', $projectID);
$sql->execute();


$storiesNotReady = array();
$storiesReady = array();
$workingInProgress = array();
$workingDone = array();
$testingInProgress = array();
$testingDone = array();
$done = array();

while ($row=$sql->fetch()) {
	$taskID = $row['ID'];
	$taskTitle = $row['title'];
	$taskDescription = $row['description'];
	$taskUserID = $row['userID'];
	$taskList = $row['list'];
	$taskOrder = $row['itemOrder'];
	$taskColor = $row['color'];

	if ($taskList=="stories-not-ready") { $storiesNotReady[]=array(id=>$taskID, title=>$taskTitle, description=>$taskDescription, userID=>$taskUserID, "list"=>$taskList, order=>$taskOrder, color=>$taskColor);}
	if ($taskList=="stories-ready") {$storiesReady[]=array(id=>$taskID, title=>$taskTitle, description=>$taskDescription, userID=>$taskUserID, "list"=>$taskList, order=>$taskOrder, color=>$taskColor);}
	if ($taskList=="working-inprogress") { $workingInProgress[]=array(id=>$taskID, title=>$taskTitle, description=>$taskDescription, userID=>$taskUserID, "list"=>$taskList, order=>$taskOrder, color=>$taskColor); }
	if ($taskList=="working-done") { $workingDone[]=array(id=>$taskID, title=>$taskTitle, description=>$taskDescription, userID=>$taskUserID, "list"=>$taskList, order=>$taskOrder, color=>$taskColor); }
	if ($taskList=="testing-inprogress") { $testingInProgress[]=array(id=>$taskID, title=>$taskTitle, description=>$taskDescription, userID=>$taskUserID, "list"=>$taskList, order=>$taskOrder, color=>$taskColor); }
	if ($taskList=="testing-done") { $testingDone[]=array(id=>$taskID, title=>$taskTitle, description=>$taskDescription, userID=>$taskUserID, "list"=>$taskList, order=>$taskOrder, color=>$taskColor); }
	if ($taskList=="done") { $done[]=array(id=>$taskID, title=>$taskTitle, description=>$taskDescription, userID=>$taskUserID, "list"=>$taskList, order=>$taskOrder, color=>$taskColor); }

}

echo json_encode(array(storiesNotReady=>$storiesNotReady, storiesReady=>$storiesReady, workingInProgress=>$workingInProgress, workingDone=>$workingDone, testingInProgress=>$testingInProgress, testingDone=>$testingDone, done=>$done));
?>