$(function(){
	//显示全部分类信息
	$(".goods_list li").hover(function(){
		$(this).addClass("li_selected").siblings().removeClass("li_selected");
		$(this).find(".listi5 img:eq(1)").show();
		$(this).find(".listi5 img:eq(0)").hide();
		$(this).find("h3").css("color","#fff");
		$(this).find("a").css("color","#fff");
	},function(){
		$(this).removeClass("li_selected");
		$(this).find(".listi5 img:eq(1)").hide();
		$(this).find(".listi5 img:eq(0)").show();
		$(this).find("h3").css("color","#000");
		$(this).find("a").css("color","#555");
	});

	//轮播图
	var currIndex = 0,
			lens = $(".dl").length,
			nextIndex = 1,
			timer = null;

	//添加小圆点
	for(var i = 0;i<lens;i++){
		$("<li></li>").appendTo("#lunbox_id");
	}
	$("#lunbox_id li").eq(0).addClass("now_li");
	var $li = $("#lunbox_id li");
	$li.each(function(index,element){
		$(this).on("click",function(){
			nextIndex = $(this).index();
			clearInterval(timer);
			move();
			timer = setInterval(move,3000);
		});
	})
	function move(){
		$(".dl").eq(currIndex).stop(true).fadeOut(1000);
		$(".dl").eq(nextIndex).stop(true).fadeIn(1000);
		$("#lunbox_id li").eq(nextIndex).addClass("now_li").siblings().removeClass("now_li");
		currIndex = nextIndex;
		nextIndex++;
		if(nextIndex === lens){
			nextIndex = 0;
		}
	}
	timer = setInterval(move,3000);
	move();


	//<!-- 互联网品牌生态运营集团 -->
	var index_01 = 0,
		plens = $(".firstP").length,
		$firstP = $(".firstP"),
		timer = null;
	// 自动轮播
	function auto(){
		$firstP.eq(index_01).show().siblings().hide();
		index_01++;
		if(index_01 === plens){
			index_01 = 0;
		}
	}
	auto();
	timer = setInterval(auto,3000);
	// 点击换一批，停止自动轮播
	$(".divhuan").on("click",function(){
		auto();
	});
	// 鼠标悬停在图片上停止自动轮播
	$(".hd_show").hover(function(){
		clearInterval(timer);
	},function(){
		// auto();
		timer = setInterval(auto,3000);
	});

	// 韩都动态
	$(".tabs").on("mouseenter",function(){
		$(this).addClass("on").siblings().removeClass("on");
		var index = $(this).index();
		$(".flower_item").eq(index).stop(true).fadeIn(400).siblings().stop(true).fadeOut(400);
	});
	
	// 新品上市
	$("#new_arrial .tab_brand a").eq(0).addClass("hover");
	var $tabBrand = $("#new_arrial .tab_brand a");
	$tabBrand.each(function(index,element){
		$(this).on("mouseenter",function(){
			$(this).addClass("hover").parent().siblings().children("a").removeClass("hover");
			// var index = $(this).index();
			$(".floor_con").eq(index).stop(true).fadeIn(1000).siblings(".floor_con").hide();
		})
	});
	var alens = $("#new_arrial .tab_brand a").length;
	for(i = 0;i<alens - 1;i++){
		$(".floor_con:first").clone(true).appendTo("#new_arrial").hide();
	}
	// 加载图片
	$(window).on("load",function(){
		$.getJSON("json/images.json",function(data){
			// 韩风女装
			var womenCloth = data.womenCloth;
				$.each(womenCloth,function(index,element){
					$(".new_boxs:first").clone(true).appendTo(".floor_con:eq(0)").show()
					.find("img").attr("src",element.imgUrl).parents(".new_boxs")
					.find(".new_price span").text(element.price).parents(".price")
					.find(".old_price span").find("span").text(element.prevPrice);
				});
			// 韩风男装
			var manCloth = data.manCloth;
			$.each(manCloth,function(index,element){
				$(".new_boxs:first").clone(true).appendTo(".floor_con:eq(1)").show()
				.find("img").attr("src",element.imgUrl).parents(".new_boxs")
				.find(".new_price span").text(element.price).parents(".price")
				.find(".old_price span").find("span").text(element.prevPrice);;
			});
			//老人装
			var oldWoman = data.oldWoman;
			$.each(oldWoman,function(index,element){
				$(".new_boxs:first").clone(true).appendTo(".floor_con:eq(2)").show()
				.find("img").attr("src",element.imgUrl).parents(".new_boxs")
				.find(".new_price span").text(element.price).parents(".price")
				.find(".old_price span").find("span").text(element.prevPrice);;
			});
			//简约女装
			var easyWoman = data.easyWoman;
			$.each(easyWoman,function(index,element){
				$(".new_boxs:first").clone(true).appendTo(".floor_con:eq(3)").show()
				.find("img").attr("src",element.imgUrl).parents(".new_boxs")
				.find(".new_price span").text(element.price).parents(".price")
				.find(".old_price span").find("span").text(element.prevPrice);;
			});
			//童装
			var children = data.children;
			$.each(children,function(index,element){
				$(".new_boxs:first").clone(true).appendTo(".floor_con:eq(4)").show()
				.find("img").attr("src",element.imgUrl).parents(".new_boxs")
				.find(".new_price span").text(element.price).parents(".price")
				.find(".old_price span").find("span").text(element.prevPrice);;
			});
		});
	});

	// 韩风女装
	$(window).on("load",function(){
		var floor = $(".floor").eq(1).offset().top;
		console.log(floor);
		console.log($(this).scrollTop(),$(window).height());
		$.getJSON("json/menuList.json",function(data){
			console.log(data);
			$.each(data.hfWomen,function(index,element){
				$("<a href='"+element.url+"'>"+element.title+"</a>").appendTo("#floor1 .tab_list");
			});
			$.each(data.hot_sale1,function(index,element){
				$("<a href='"+element.url+"'>"+element.title+"</a>").appendTo(".s_cate1");
			});
			$.each(data.hot_sale2,function(index,element){
				$("<a href='"+element.url+"'>"+element.title+"</a>").appendTo(".s_cate2");
			});
			
		});
		$("body img").fadeIn("slow");
	});
	// 热销排行
	for(var i = 0;i<7;i++){
		$(".right_hot li:first").clone(true).appendTo(".right_hot ul");
	}
	$(".right_hot li:first").find("div").hide().next().show();
	var $hotLi = $(".right_hot li");
	$hotLi.each(function(index,element){
		$(this).on("mouseenter",function(){
			$(this).find("div").hide();
			$(this).find(".hot_con").show();
			$(this).siblings().find(".hot_con").hide().prev().show();
		});
	});
	/*$("img").each(function(){
		$(this).attr("data-original",$(this).attr("src"));
		$(this).attr("src","");
	});
	$(".floor_con img").lazyload({
		placeholder:"img/loading.gif",
		effect:"fadeIn",
		threshold:50,
		container:$(".floor_con"),
		failurelimit:10,
	});*/
});