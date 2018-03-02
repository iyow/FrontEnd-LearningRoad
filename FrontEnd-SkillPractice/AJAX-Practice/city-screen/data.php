<?php

//连接数据库后进行查询筛选  返回一个字符串拼接出来的带参数的函数调用给前端，前端动态加载script标签请求运行此函数
require_once('connect.php');

$code = $_GET['citycode'];
$callback = $_GET['callback'];
$flag = $_GET['flag'];
if($flag == 1){
	$query=mysql_query("select * from province order by id");
}else if($flag == 2){
	$query=mysql_query("select * from city where provincecode = '".$code."' order by id" );
}else if($flag == 3){
	$query=mysql_query("select * from area where citycode = '".$code."' order by id" );
}
$sayList = [];
while ($row=mysql_fetch_array($query)) {
	$sayList[] = array(
		'code'=>$row['code'],
		'name'=>$row['name']
    );
}
if($sayList){
	echo $callback.'('.json_encode($sayList).')';
}else{
	echo $callback.'('.'[]'.')';
}

?>