<?php
	$type = $_POST["type"];
	if($type == "order"){
		$info = $_POST["info"];

		$array = array("info" => $info);
		$json = file_get_contents("../json/order.json");//获取user1.json里的数据 json格式
		$arr_json = json_decode($json,true);//将json格式的数据转化为数组类型的数据
		array_push($arr_json,$array);
		$json = json_encode($arr_json);
		$str= preg_replace("#\\\u([0-9a-f]+)#ie", "iconv('UCS-2', 'UTF-8', pack('H4', '\\1'))", $json);
		file_put_contents("../json/order.json",$str);		
	}
?>