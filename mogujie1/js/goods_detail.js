$(function(){
	$(".home").show();
	$(".show-login").hide();
	$(".col_ok").on("click",function(){
		$(".dapei_sku").css("display","none");
	});
	//商铺信息
	//尖尖旋转
		$(".icon_show").hover(function(){
			$(".shop-info").stop(true).show();
			$(this).parents(".user-info").addClass("user-info-hover");
			$(".icon_show_sore").addClass("icon_current");
		},function(){
			var timer = setTimeout(function(){
				$(".shop-info").stop(true).hide();
				//console.log("12213");
			},100);
			
			$(this).parents(".user-info").removeClass("user-info-hover");
			$(".icon_show_sore").removeClass("icon_current");
			$(".shop-info").hover(function(){
				clearTimeout(timer);
				$(this).stop(true).show();
			},function(){
				$(this).stop(true).hide();
			});
		});
		//放大镜
		var bigWidth = $(".big_pic1").width(),
			bigHeight = $(".big_pic1").height(),
			popWidth = $(".pop").width(),
			popHeight = $(".pop").height(),
			midWidth = $(".mid_pic").width(),
			midHeight = $(".mid_pic").height(),
			rateX = midWidth / popWidth,
			rateY = midHeight / popHeight;
		$(".big_pic1").hover(function(){
			$(".pop,.mid_pic").show();

		},function(){
			$(".pop,.mid_pic").hide();
		}).on("mousemove",function(event){
			$(".pop").offset({
				left:event.pageX - popWidth / 2,
				top:event.pageY - popHeight / 2
			});
			var position = $(".pop").position(),
				_left = position.left,
				_top = position.top;
			if(_left < 0){
				_left = 0;
			}else if(_left > bigWidth - popWidth){
				_left = bigWidth - popWidth;
			}
			if(_top < 0){
				_top = 0;
			}else if(_top > bigHeight - popHeight){
				_top = bigHeight - popHeight;
			}
			$(".pop").css({
				left:_left,
				top:_top
			});
			$(".mid_pic img").css({
				left:-_left * rateX,
				top:-_top * rateY
			});

		});
		//倒计时
			var SysSecond = 100000;
			interValObj = window.setInterval(SetRun,1000);
			function SetRun(){
				if(SysSecond > 0){
					SysSecond -= 1;
					var second = Math.floor(SysSecond % 60),
						minite = Math.floor(SysSecond / 60 % 60),
						hour = Math.floor(SysSecond / 3600 % 24),
						day = Math.floor(SysSecond / 3600 / 24);
						
					$(".d").text(day);
					$(".h").text(hour);
					$(".m").text(minite);
					$(".s").text(second);
				}
				else{
					window.clearInterval(interValObj);
				}
			}
		
	//all_goods{
		$(".all_goods").hover(function(){
			$(".catagory_list").stop(true).show();
		},function(){
			var timer = setTimeout(function(){
				$(".catagory_list").stop(true).hide();
			},100);
			$(".catagory_list").hover(function(){
				clearTimeout(timer);
				$(this).stop(true).show();
			},function(){
				$(this).stop(true).hide();
			})
		});
	
		//xiaotu bianhua 
		$(".small_pic li").each(function(index,element){
			$(this).on("mouseover",function(){
				var index = $(this).index();
				$(this).addClass("c").siblings("li").removeClass("c");
				$(this).children("i").addClass("li_border");
				$(this).siblings("li").children("i").removeClass("li_border");
				var _attr = $(this).children("img").attr("src");
				$(".big_pic1").children("img").attr("src",_attr.replace("s",""));
				$(".mid_pic").find("img").attr("src",_attr.replace("s",""));
			});
		});

	//尺码
	$(".size_txt").on("click",function(){
		$(this).addClass("size_curr").siblings().removeClass("size_curr");
	});
	//+-
	$(".minus").on("click",function(){
		var amount = $(this).next().text();
		
		if(amount<=1){
			amount = 1;
		}
		else{
			amount--;
		}
		
		$(this).next().text(amount);
		
	});
	$(".add").on("click",function(){
		var amount = $(this).prev().text();
		amount++;
		$(this).prev().text(amount);
	});
	//hover函数隐藏，显示
	function handHover(hoverObj,showObj){
		$(hoverObj).hover(function(){
			$(showObj).stop(true).show();
			
		},function(){
			var timer = setTimeout(function(){
				$(showObj).stop(true).hide();
			},100);
			$(showObj).hover(function(){
				clearTimeout(timer);
				$(this).stop(true).show();
			},function(){
				$(this).stop(true).hide();
			});
		});
	}
	$(".sidebar-item:not(first)").each(function(index,element){
		$(this).hover(function(){
			$(this).addClass("hover_curr");
		},function(){
			$(this).removeClass("hover_curr");
		});
	});
	$(".cart_tip_hd").each(function(index,element){
		$(this).hover(function(){
			$(this).next(".cart_hidden").show();
		},function(){
			var  timer = setTimeout(function(){
				$(this).next(".cart_hidden").hide();
				//console.log('3446665');
			},100);
			$(this).next(".cart_hidden").hover(function(){
				$(this).show();
			},function(){
				clearTimeout(timer);
				$(this).hide();
			});
			
		});
	})
	handHover(".share",".share_w");
	
	//farate
	//hover add attr
	function addAttr(hoverObj,attr){
		$(hoverObj).hover(function(){
			$(this).addClass(attr);
		},function(){
			$(this).removeClass(attr);
		});
	}
	function clickHand(clickObj,attr){
		$(clickObj).on("click",function(){
			$(this).addClass(attr).siblings().removeClass(attr);
		});
	}
	addAttr(".fav","border_red");
	
	//dapei_item
	clickHand(".dapei_item","active");
	//close
	$(".close,.col_ok").on("click",function(){
		$(".dapei_sku").hide();
		//console.log("jjkk");
	});
	
	//select_style
	$(".select_style").on("click",function(){
		$(".dapei_sku").stop(true).show();
	});
	//手机扫码下单
	
	handHover(".qrcode",".qrcode_pic");
	$(".qrcode").hover(function(){
		$(this).children(".qrcode_arrow").addClass("arrow_selectd");
	},function(){
		$(this).children(".qrcode_arrow").removeClass("arrow_selectd");
	});
	
	//固定列表
	//吸顶效果
	var winHeight = $(window).height(),
		headHeight = $(".header-top").height(),
		shopHeight = $(".shop-header").height(),
		bannerHeight = $(".banner").height(),
		navHeight = $(".nav_top").height(),
		hdHeight = $(".hd_txt").height() * 3,
		depHeight = $(".detail_primary").outerHeight(),
		decHeight = $(".detail_content").outerHeight(),
		mainHeight = $(".col_main").height(),
		isClick = false,
		siHeight = $(".module_shop").height();
	
		$(window).on("scroll",function(){
			if(!isClick){
				
				var scrollTop = $(this).scrollTop();
				var height =hdHeight + siHeight + decHeight + depHeight + headHeight + bannerHeight + navHeight + shopHeight;
				//console.log(height);
				
				if(scrollTop > height - winHeight / 2){
					$(".hd_h3").addClass("ui_fixed");
					$(".tabbar_box").addClass("ui_fixed");
					$(".col_extra").addClass("ui_fixed");

				}
				else{
					$(".hd_h3").removeClass("ui_fixed");
					$(".tabbar_box").removeClass("ui_fixed");
					$(".col_extra").removeClass("ui_fixed");
				}
				
				//切换显示导航样式
			
				$(".module_graphic .floor").each(function(index,element){
				var _top = $(this).offset().top;
				if(_top - winHeight  < scrollTop){
					$(".ul_shop li").eq(index).addClass("li_current").siblings().removeClass("li_current");
					
				}
			});
				
			}
			
			
		});
		//点击楼层导航
		$(".ul_shop li").on("click",function(){
			isClick = true;
			$(this).addClass("li_current").siblings().removeClass("li_current");
			var index = $(this).index();
			var _top = $(".module_graphic .floor").eq(index).offset().top;
			$("html,body").stop(true).animate({scrollTop:_top},1000,function(){
				isClick = false;
			});
		});
	//回到顶部
	$(".siber-item").on("click",function(){
		$(window).scrollTop(0);
	});
	
	//siber_tabbar
	$(".tab_graphic").on("click",function(){
		$(this).addClass("selected").siblings().removeClass("selected");
	});
	

	
	//tab_bar
	$(".tab_graphic").on("click",function(){
		var index = $(this).index();
		console.log(index);
		if(index === 2){
			$(".goods_privi").hide();
			$(".panel_box").hide();
			$(".goods_tui").show();
			$(".module_shop").eq(2).hide();
			$(".shop_floor").hide();
		}
		if(index === 0){
			$(".goods_privi").hide();
			$(".panel_box").show();
			$(".goods_tui").hide();
			$(".shop_floor").show();
			$(".module_shop").eq(2).show();
		}
		if(index === 1){
			$(".goods_privi").show();
			$(".panel_box").hide();
			$(".goods_tui").hide();
			$(".module_shop").eq(2).hide();
			$(".shop_floor").hide();
		}
	})
	
	//选择商品
	$(".clo_ok").on("click",function(){
		$(".dapei_sku").hide();
	});
	$(".size_pic img").on("click",function(){
		$(this).addClass("border_img").siblings().removeClass("border_img");
	});
	
	/********************************************************************/
	/************************添加购物车*******************************/
	/********************************************************************/
	//添加购物车
	$(".add_cart").on("click",function(){
		cartinfo = {
			name : $(".name-wrap a").text(),//店铺名称
			title : $(".goods_title span").text(),//商品名字
			imgSrc : $(".border_img").attr("src"),//图片路径
			sizeCurr : $.trim($(".size_curr").text()).substr(0,1),//商品尺寸
			count : $(".stack_count").text(),//数量
			priceNext : $(".tuan_price").text().slice(1),//打折后的价格
			color : $(".border_img").attr("alt"),//颜色
			pricePrev : $(".property_cont .price1").text().slice(1)//打折前的价格
			
		}
		addCart(cartinfo);
		$(".cart_li").clone(true).appendTo(".mac_height_ie6").removeClass("cart_li").show()
		.find(".imgbox img").attr("src",cartinfo.imgSrc).parent()
		.next().text(cartinfo.title)
		.next().find(".info_color").text(cartinfo.color)
		.next().text(cartinfo.sizeCurr).parent()
		.next().text(cartinfo.priceNext);
		
			
	});

	//添加至购物车my_cart.json中
	function addCart(cartinfo){
		$.ajax({
				type:"post",
				url:"../php/addCart.php",
				async:true,
				data:{"type":"addCart","cartinfo":cartinfo},
				success:function(data){
				}
		});
	}
	
	//添加至购物车时的抛物线运动
	$(function() { 
	    // $(window).on("scroll",function(){
	   		 $(".add_cart").click(function(event){ 
	    		var offset = $("#my_cart").offset();
	     		var scTop = $(window).scrollTop();
	       		var flyer = $('<img src="../img/addCart.png">'); 
		        flyer.fly({ 
		            start: { 
		                left: event.pageX-60, //开始位置（必填）#fly元素会被设置成position: fixed 
		                top: event.pageY - scTop-30 //开始位置（必填） 
		            }, 
		            end: { 
		                left: offset.left + 10, //结束位置（必填） 
		                top: offset.top - scTop + 10, //结束位置（必填） 
		                width: 0, //结束时宽度 
		                height: 0 //结束时高度 
		            }, 
		            onEnd: function(){ //结束回调 
		                 this.destory(); //移除dom 
		            } 
		        }); 
	    	}); 
	 	// });
 	});
	
});
//对子元素进行添加或删除新增元素
function childHover(hoverObj,childObj){
	$(hoverObj).hover(function(){
		$(this).children(childObj).show();
	},function(){
		$(this).children(childObj).hide();
	});
}