<?php
	$type = $_POST["type"];
	if(isset($type)){
		//存在为true
		if($type == "checkphone"){
			$flag = "";
			$phone = $_POST["phonenum"];
			$json = file_get_contents("../json/userInfo.json");//获取userinfo里的数据json格式
			$arr_json = json_decode($json,true);//将json格式的数据转化为数组类型的数据

			for($i = 0;$i<count($arr_json);$i++){
				//获取数组长度
				if($arr_json[$i]["tel"] == $phone){
					$flag = true;
				}
			}
			echo json_encode($flag);

		}
	}
		if($type == "insert"){
			$flag = true;
			$phone = $_POST["phonenum"];
			$pwd = $_POST["password"];
			$array = array("tel" => $phone,"pwd" => $pwd);
			$json = file_get_contents("../json/userInfo.json");
			$arr_json = json_decode($json,true);

			array_push($arr_json, $array);//将$array添加到$arr_json中
			$json = json_encode($arr_json);
			file_put_contents("../json/userInfo.json", $json);
		}
		if($type == "login"){
			$phone = $_POST["phonenum"];
			$pwd = $_POST["password"];
			$json = file_get_contents("../json/userInfo.json");//获取userinfo里的数据json格式
			$arr_json = json_decode($json,true);//将json格式的数据转化为数组类型的数据
			for($i = 0;$i < count($arr_json);$i++){
				if($phone == $arr_json[$i]["tel"] && $pwd == $arr_json[$i]["pwd"]){
					echo "true";
				}
			}
			$json_encode = json_encode($arr_json);
			file_put_contents("../json/userInfo.json",$json_encode);
			// echo json_encode($flag);
		}
	
?>