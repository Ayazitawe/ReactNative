<?php
include('db.php');
// Creating connection.
 $conn= mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);

$json = file_get_contents('php://input');
$decodedData= json_decode($json,true);
$Emailorg = $decodedData['Email'];
// Creating SQL command to fetch all records from Table.
$sql = "SELECT * FROM orgchildren where OrgChildEmail = '$Emailorg' and userEkfal!= 'empty'";
$result = $conn->query($sql);
$num=$result->num_rows;
function convert($string) {
    $arabicNumbers = ["٠","١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩" ] ;
	$englishNumber =["0","1","2","3","4","5","6","7","8","9"];
    $str = str_replace($englishNumber,$arabicNumbers,$string );
   return $str;
}

if ($result->num_rows >0) {
while($row = $result->fetch_assoc()) {
	$str = strtotime($row['dateEkfal']);
    $mm=date('d-m-Y', $str);
    $counter=0;
	 for ($x=0;$x<$row['ekfalTimes']; $x++){
		$counter+=1;
		unset($datearr);
		$datearr[]=explode("-",$mm);
		$mm1=convert ($datearr[0][0])."-".convert ($datearr[0][1])."-".convert ($datearr[0][2]);
		$arr[] = array("الرقم" => convert($counter),"تاريخ الدفع"=>$mm1,"المبلغ" =>convert($row['ChildMoney']));
		$date2 = date('d-m-Y', strtotime($mm. ' + 1 months'));
        $mm=$date2;
		
	 }
	 //,"ChildImage" => $row['ChildImage']

$response[] = array("id" => $row['id']
,"ChildImage" => $row['ChildImage']
,"ekfalTimes" =>$row['ekfalTimes'],
 "ChildName" => $row['ChildName'],"OrgChildEmail" =>$row['OrgChildEmail'],"ChildBD" =>$row['ChildBD'],"ChildStory" =>$row['ChildStory'],"ChildMoney" =>$row['ChildMoney'],
 "dateEkfal" =>$row['dateEkfal'],"ChildGender" =>$row['ChildGender'],"arr" =>$arr,"countChild" =>$result->num_rows  ,"userEkfal" => $row['userEkfal']);
 $json = json_encode($response);//."".$response2
 
 }
 
} else {
	
	$response="No Results Found";
 $json = json_encode($response);
}
 echo $json;
$conn->close();
?>