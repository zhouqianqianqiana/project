<?php
	$type=$_POST["type"];
	if($type == "addAddress"){
		// add("address","address","../json/indent.json");
		$addObj = $_POST["address"];
		$array = array("address" => $addObj);
		$json = file_get_contents("../json/indent.json");
		$arr_json = json_decode($json,true);//将json格式的数据转化为数组类型的数据
		array_push($arr_json,$array);
		$json = json_encode($arr_json);
		$str= preg_replace("#\\\u([0-9a-f]+)#ie", "iconv('UCS-2', 'UTF-8', pack('H4', '\\1'))", $json);
		file_put_contents("../json/indent.json",$str);
	}

	/*function add(addObj,addName,path){//1,待插入的对象 2，插入的文件 3，保存的路径
		$addObj = $_POST[addObj];
		$array = array(addName => $addObj);
		$json = file_get_contents(path);
		$arr_json = json_decode($json,true);//将json格式的数据转化为数组类型的数据
		array_push($arr_json,$array);
		$json = json_encode($arr_json);
		$str= preg_replace("#\\\u([0-9a-f]+)#ie", "iconv('UCS-2', 'UTF-8', pack('H4', '\\1'))", $json);
		file_put_contents(path,$str);		
	}*/
?>