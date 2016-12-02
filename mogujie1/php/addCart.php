<?php
	$type = $_POST["type"];
	if($type == "addCart"){
		$flag = true;
		$cartinfo = $_POST["cartinfo"];

		$array = array("cartinfo" => $cartinfo);
		$json = file_get_contents("../json/my_cart.json");//获取user1.json里的数据 json格式
		$arr_json = json_decode($json,true);//将json格式的数据转化为数组类型的数据
		array_push($arr_json,$array);
		$json = json_encode($arr_json);
		$str= preg_replace("#\\\u([0-9a-f]+)#ie", "iconv('UCS-2', 'UTF-8', pack('H4', '\\1'))", $json);
		file_put_contents("../json/my_cart.json",$str);		
	}
	if($type == "delete"){
		$index = $_POST["index"];
		$json = file_get_contents("../json/my_cart.json");
		$arr_json = json_decode($json,true);
		array_splice($arr_json,$index,1);//删除数组的其中一个元素，（删除数组（必需），删除数组的索引值（必需），删除数组的长度（可选），规定带有要插入原始数组中元素的数组）
		$json_encode = json_encode($arr_json);
		$str= preg_replace("#\\\u([0-9a-f]+)#ie", "iconv('UCS-2', 'UTF-8', pack('H4', '\\1'))", $json_encode);
		file_put_contents("../json/my_cart.json",$str);
	}
	if($type == "clearAll"){
		$json = file_get_contents("../json/my_cart.json");
		$arr_json = json_decode($json,true);
		array_splice($arr_json,0);
		$json_encode = json_encode($arr_json);
		$str= preg_replace("#\\\u([0-9a-f]+)#ie", "iconv('UCS-2', 'UTF-8', pack('H4', '\\1'))", $json_encode);
		file_put_contents("../json/my_cart.json",$str);
	}
	
?>