<?php
$un = $_POST["uname"];
$pw = $_POST["pwd"];
$conn = new mysqli("localhost","root","","myshop",3306);
$sql = "select * from users where username = '$un'";
$res = $conn->query($sql);
$num = $res->num_rows;
if($num == 1){
    echo '{"login":false,"msg":"账号已被注册！请换一个账号！"}';
}else{
    echo '{"login":true,"msg":"账号可用！注册成功！"}';
    $sqq = "select * from users";
    $nun = $conn->query($sqq)->num_rows;
    $ssq = "insert into users(uid,username,password) value('$nun','$un','$pw')";
    $conn->query($ssq);
}
$conn->close();
