$(function(){
	//倒计时
	var SysSecond = 1000000;
	interValObj = window.setInterval(SetRun,1000);
	function SetRun(){
		if(SysSecond > 0){
			SysSecond -= 1;
			var second = Math.floor(SysSecond % 60),
				minite = Math.floor(SysSecond / 60 % 60),
				hour = Math.floor(SysSecond / 3600 % 24);
				
			$(".timer-hh").text(hour);
			$(".timer-mm").text(minite);
			$(".timer-ss").text(second);
		}
		else{
			window.clearInterval(interValObj);
		}
	}

	//显示用户名
		(function (){
			$.cookie.json = true;
			if($.cookie("logInfo")){
				var userName = $.cookie("logInfo");
				$(".show-nologin").hide();
				$(".user_meta").show();
				$(".user_meta").find("a").eq(0).text(userName);
			}
			
		})();
	
	//header-top
	$(".sidebar-item:not(first)").each(function(index,element){
		$(this).hover(function(){
			$(this).addClass("hover_curr");
		},function(){
			$(this).removeClass("hover_curr");
		});
	});
	childHover(".user_fav",".ext_mode");
	// childHover(".shopping_cart_v2",".shop_cart_info");
	childHover(".myxiaodian",".ext_mode");
	childHover(".user_meta",".ext_mode");
	childHover(".custom_item",".ext_mode");
	childHover(".selectbox","ol");
	
function childHover(hoverObj,childObj){
	$(hoverObj).hover(function(){
		$(this).children(childObj).stop(true).show();
	},function(){
		$(this).children(childObj).stop(true).hide();
	});
}

	//用户注册后吧注册和登录隐藏，显示用户名

	$("#menu_personal").find(".s2").eq(2).find("a").on("click",function(){
		$.cookie.json = true;
		$.removeCookie("logInfo",{expires:7,path:"/"});
		$(".show-nologin").show();
		$(".user_meta").hide();
	});
	//搜索
	$("#search_txt").on("keyup",function(){
		var _txt = $("#search_txt").val();
		$.getJSON(
				"http://search.mogujie.com/jsonp/searchTips/1?callback=?&keyword="+_txt,
				function(res){
					var sHtml = "";
					$("#search_list").empty();
					for(var i =0; i < res.data.tips.length; i++) {
							sHtml += '<li><a href="'+res.data.tips[i].pcurl+'"> '+res.data.tips[i].title +'</a></li>';
							 
						}
					$(sHtml).appendTo("#search_list");
				}
			);
	});

	

});

	
