$(function(){
	$(".more").on("click",function(){
		$(".st_area").stop(true).show();
		$(".st_area li").on("click",function(){
			$(".area").text($(this).text());
			$(".st_area").stop(true).hide();
		});
	});
	//验证

		$(".rg_phone").on("focusout",function(){
		var _phone = $(".rg_phone").val(),
				reg = /^[1-3]\d{10}$/;
		if(!reg.test(_phone)){
				$(".error").text("请输入正确的手机号").show();
			}
		$(".rg_phone").on("click",function(){
			$(".error").stop(true).hide();
			
		});
				
	});
	
	
	
	//注册

	$(".get_code").on("click",function(){
		if(!$(".rg_phone").val()){
			$(".error").stop(true).show();
			$(".error").text("请输入手机号");
		}
	});


	
	//点击注册按钮
	$(".rg_rg").on("click",function(){
		if(!$(".rg_phone").val()){
			$(".error").stop(true).show();
			$(".error").text("请输入手机号");
		}
		else{
			var phone = $(".rg_phone").val();
			checkPhone(phone);
		}
	
		//检查电话号码是否已注册
		function checkPhone(phone){
			$.ajax({
				type:"post",
				url:"../php/userInfo.php",
				async:true,
				data:{"type":"checkphone","phonenum":phone},
				success:function(data){
					var flag = JSON.parse(data);
					if(flag === true){
						$(".full_box,.have_register").show();
					}
					else{
						insert();
					}
				}
			});
		}
		
		function insert(){
			var phone = $(".rg_phone").val(),
				pwd = $(".ident").val();
				$.ajax({
					type:"post",
					url:"../php/userInfo.php",
					async:true,
					data:{"type":"insert","phonenum":phone,"password":pwd},
					success:function(data){
						alert("注册成功！");
					}
				});
		}
		
	});

	$(".close,.vp_other").on("click",function(){
		$(".full_box,.have_register").hide();
	});
	$("vp_lg").on("click",function(){
		window.location.href="login.html";
	});
});
