$(function(){

		
	$(".sidebar-item:not(first)").each(function(index,element){
		$(this).hover(function(){
			$(this).addClass("hover_curr");
		},function(){
			$(this).removeClass("hover_curr");
		});
	});
	childHover(".user_fav",".ext_mode");
	childHover(".myxiaodian",".ext_mode");
	childHover(".user_meta",".ext_mode");
	childHover(".custom_item",".ext_mode");
	
	
	$(".cart_tip_hd").each(function(index,element){
		$(this).hover(function(){
			$(this).next(".cart_hidden").show();
		},function(){
			var  timer = setTimeout(function(){
				$(this).next(".cart_hidden").hide();
				console.log('3446665');
			},100);
			$(this).next(".cart_hidden").hover(function(){
				$(this).show();
			},function(){
				clearTimeout(timer);
				$(this).hide();
			});
			
		});
	})
		
		
		//固定搜索
		var headerHeight = $("#header").height(),
			winHeight = $(window).height(),
			headerMidHeight = $(".header-wrap").height(),
			wrapHeight = $(".search_condition_box").height(),
			height = headerHeight + headerMidHeight + wrapHeight;
			
		$(window).on("scroll",function(){
			var scrollTop = $(this).scrollTop();
			if(scrollTop >  winHeight - height){
				$(".search_box").stop(true).show().addClass("search_container");
				
			}
			else{
				$(".search_box").stop(true).hide().removeClass("search_container");
				
			}
		});
		

		//所搜
		$(".txt").on("click",function(){
			$(this).val("");
		});

		$(window).on("load",function(){
			$.get("../json/goods_list.json",function(data){
				var all_goods = data.data.all_goods;
				for(var i = 0;i < 3;i++){
				$.each(all_goods,function(index,element){
					$(".iwf:first").clone(true).appendTo(".common_goods_wall").show()
						.find(".fill_img").attr("data-original",element.url).parent()
						.next().find(".title").text(element.title)
						.next().find("img").attr("src",element.brand).parent()
						.next().find(".price_info").text("￥"+element.price)
						.next().find("span").text(element.like);
				}); 
				}
				// 延迟加载图片
					setTimeout(function(){$(".fill_img").lazyload({
						placeholder:"../img/loading.png",
						effect:"fadeIn",
						threshold:50,
					});},1000);
				    var cloths = data.data.cloths;
				    $.each(cloths,function(index,cloth){
				    	var that = index;
				    	$(".type_section:first").clone(true).appendTo(".type_sections").show()
				    	.find(".cat_img").find("img").attr("src",cloth.img_path).parents(".type_section")
				    	.find("dt a").text(cloth.title);

				    	//详细分类
				    	var details = cloth.details;
				    	var $typeSection = $(".type_section").eq(that + 1);
				    	for(var i = 0;i<details.length;i++){
				    		var $type = $typeSection.find("ul li:first").clone(true)
				    		.appendTo(".type_section:eq("+(that+1)+") ul").show()
				    		.find("a").text(details[i]).removeClass("hot");
				    	}
				    	
				    });

				    //分类
				    var list = data.data.list;
				    for(var i = 0;i<list.length;i++){
				    	$("<li><a href='javascript:;'>"+list[i]+"</a></li>").appendTo(".nav_list");
				    }
				    $(".nav_list li").eq(0).addClass("on");

				    //mid_top
					$(".nav_list li").each(function(index,element){
						$(this).on("click",function(){
							$(this).addClass("on").siblings().removeClass("on");
						});
						
					});
					//搜索
					var nofllow = data.data.nofllow;
					for(var i = 0;i<nofllow.length;i++){
						$("<a href='javascipt:;'>"+nofllow[i]+"</a>").appendTo(".sear-show");
					}

					//right_img
					var rightImg  = data.data.right_img;
					$(".right_img").find("img").attr("src",rightImg);
			});
		});
});
function childHover(hoverObj,childObj){
	$(hoverObj).hover(function(){
		$(this).children(childObj).stop(true).show();
	},function(){
		$(this).children(childObj).stop(true).hide();
	});
}
