$(function(){
	$(".lo_mod").on("click",function(){
		$(".login_form").stop(true).show();
		$(".login_tel").stop(true).hide();
		$(this).addClass("tab_on").parent().siblings(".f1").children(".eb_mod").removeClass("tab_on");
	});
	$(".eb_mod").on("click",function(){
		$(".login_tel").stop(true).show();
		$(".login_form").stop(true).hide();
		$(this).addClass("tab_on");
		$(".lo_mod").removeClass("tab_on");
	});
	$(".toggle-qrcode").on("click",function(){
		$(".cont_login").stop(true).hide();
		$(".lg_left").stop(true).show();
	});
	$(".lg_regular").on("click",function(){
		$(".cont_login").stop(true).show();
		$(".lg_left").stop(true).hide();
		
	});
	
	//验证
	$(".login_submit").on("click",function(){
		if(!$(".login_txt").val()){
			$(".login_error").stop(true).show().text("请输入昵称/邮箱/手机号");
		}
		else if(!($(".login_txt").val() && $(".login_pwd").val())){
			$(".login_error").stop(true).show().text("请输入密码");
			
		}
		
		
	});
	
	$(".login_txt").on("click",function(){
			$(".login_error").stop(true).hide();
		});
		$(".login_pwd").on("click",function(){
			$(".login_error").stop(true).hide();
		});
	
	
	$(".lg_pwd").on("click",function(){
		if(!$(".login_phone").val()){
			$(".login_error").stop(true).show().text("请输入手机号");
		}
		$(".login_phone").on("click",function(){
			$(".login_error").stop(true).hide();
		});
	});
	
	$(".more").on("click",function(){
		$(".st_area").stop(true).show();
		$(".st_area li").on("click",function(){
			$(".area").text($(this).text());
			$(".st_area").stop(true).hide();
		});
	});
	
	//登录
	$(".login_submit").on("click",function(){
		var phone = $(".login_txt").val(),
			pwd = $(".login_pwd").val();
		$.ajax({
			type:"post",
			url:"../php/userInfo.php",
			async:true,
			data:{"type":"login","phonenum":phone,"password":pwd},
			success:function(data){
				if(data){
					var userName = $(".login_txt").val();
					$.cookie("logInfo",userName,{expires:7,path:"/"});
					setTimeout(function(){
						window.location.href = "../index.html";
					},2000);
					
				}
				else{
					$(".login_error").stop(true).show().text("用户名或密码错误，请重新登陆");
				}
			}
		});
	});
	
});

