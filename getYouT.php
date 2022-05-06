<?php
include('db.php');
// Creating connection.
 $conn= mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);

$json = file_get_contents('php://input');
$decodedData= json_decode($json,true);
$Emailorg = $decodedData['Email'];
// Creating SQL command to fetch all records from Table.
$sql = "SELECT * FROM yout where orgEmail = '$Emailorg'";
$result = $conn->query($sql);
$num=$result->num_rows;

if ($result->num_rows >0) {
while($row = $result->fetch_assoc()) {
	$SQL1 = "SELECT * FROM org WHERE orgEmail = '$Emailorg'";
    $exeSQL = mysqli_query($conn, $SQL1);
    $arrayu = mysqli_fetch_array($exeSQL);
$response[] = array("id" => $row['id']
,"idLink" => $row['idLink']
,"descripV" =>$row['descripV'],"orgEmail" =>$row['orgEmail'],"Message0" => $arrayu['orgName'],"Message3" => $arrayu['image']);
 $json = json_encode($response);//."".$response2
}
 
} else {
	
	$response="No Results Found";
 $json = json_encode($response);
}
 echo $json;
$conn->close();
?>