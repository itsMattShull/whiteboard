<?php
include('connect.php');

$taskID=$_POST['taskID'];
$list=$_POST['list'];
$itemOrder=$_POST['itemOrder'];
$subOrder=$_POST['subOrder'];
$one=1;

if ($subOrder=="1") {
	$sql= $conn->prepare('SELECT * FROM tasks WHERE ID=:taskID');
	$sql->bindParam(':taskID', $taskID);
	$sql->execute();

	$row=$sql->fetch();
	$oldOrder=$row['subOrder'];

	if ($itemOrder > $oldOrder) {
		$sql= $conn->prepare('UPDATE tasks SET subOrder=subOrder+:one WHERE list=:list AND subOrder=:oldOrder');
		$sql->bindParam(':one', $one);
		$sql->bindParam(':list', $list);
		$sql->bindParam(':oldOrder', $itemOrder);
		$sql->execute();
	}
	
	if ($itemOrder < $oldOrder) {

			$sql= $conn->prepare('UPDATE tasks SET subOrder=subOrder-:one WHERE list=:list AND subOrder=:oldOrder');
			$sql->bindParam(':one', $one);
			$sql->bindParam(':list', $list);
			$sql->bindParam(':oldOrder', $itemOrder);
			$sql->execute();
	}

	$sql= $conn->prepare('UPDATE tasks SET list=:list, subOrder=:itemOrder, datetime=CURRENT_TIMESTAMP WHERE ID=:taskID');
	$sql->bindParam(':list', $list);
	$sql->bindParam(':itemOrder', $itemOrder);
	$sql->bindParam(':taskID', $taskID);
	$sql->execute();
	echo "sub: $itemOrder";
}
else {
	$sql= $conn->prepare('UPDATE tasks SET list=:list, itemOrder=:itemOrder, subOrder=:one, datetime=CURRENT_TIMESTAMP WHERE ID=:taskID');
	$sql->bindParam(':list', $list);
	$sql->bindParam(':itemOrder', $itemOrder);
	$sql->bindParam(':one', $one);
	$sql->bindParam(':taskID', $taskID);
	$sql->execute();
	echo "main: $itemOrder";
}

?>