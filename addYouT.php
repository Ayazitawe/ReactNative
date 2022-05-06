<?php
include('db.php');

// Creating connection.
 $conn= mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
 
 // Getting the received JSON into $json variable.
 $json = file_get_contents('php://input');
 
 // decoding the received JSON and store into $obj variable.
 $decodedData= json_decode($json,true);
 $ORGEmail = $decodedData['Email'];
 $link = $decodedData['link']; 
 $descripV = $decodedData['descripV'];


 
 // Creating SQL query and insert the record into MySQL database table.
$Sql_Query = "insert into yout (orgEmail,idLink,descripV) values ('$ORGEmail','$link','$descripV')";
 
// Converting the message into JSON format.
if(mysqli_query($conn,$Sql_Query)){
$MSG = 'تمت إضافة مقطع فيديو جديد' ; 


$json = json_encode($MSG,JSON_UNESCAPED_UNICODE);
 
// Echo the message.
echo $json ;
}
 else{
 
 echo 'Try Again';
 
 }
 mysqli_close($conn);
?>