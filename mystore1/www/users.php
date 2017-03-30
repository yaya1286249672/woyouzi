<?php

$un = $_POST["uname"];
$pw = $_POST["pwd"];
$conn = new mysqli("localhost","root","","myshop",3306);
$sql = "select * from users where username = '$un' and password = '$pw'";
$res = $conn->query($sql);
if($res->num_rows == 1){
    echo '{"login":true,"msg":"登陆成功"}';
}else{
    echo '{"login":false,"msg":"登陆失败"}';
}
//$res = $conn->query($sql);
//echo "共有".$res->num_rows."条数据";
/*while($row = mysqli_fetch_array($res)){
    echo json_encode($row);
}*/
$conn->close();