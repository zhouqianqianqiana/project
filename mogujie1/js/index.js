$(function(){

	//如果购物车不为空
	$.ajax({
			type:"post",
			url:"json/my_cart.json",
			async:true,
			success:function(data){
			$.each(data,function(index,element){
				$li = $(".cart_li").clone(true).appendTo(".mac_height_ie6").removeClass("cart_li").show()
				.find(".imgbox img").attr("src",element.cartinfo.imgSrc).parent()
				.next().text(element.cartinfo.title)
				.next().find(".info_color").text(element.cartinfo.color)
				.next().text($.trim(element.cartinfo.sizeCurr)).parent()
				.next().text(element.cartinfo.priceNext);
				});
			//删除购物车的商品信息
			$(".mac_height_ie6 .del").each(function(index,element){
				$(this).on("click",function(){
					var $row = $(this).parent("li");
					deleteRow($row,index-1);
				});
			});
			//购物车图片路径
			$(".imgbox img").each(function(index,element){
				var _src = $(this).attr("src");
				$(this).attr("src",_src.replace("../",""));
			});
			//判断购物车是否为空
			$(".shopping_cart_v2").hover(function(){
					if(data === null || data.length === 0){
						$(".empty_cart").show();
				}else{
					$(".mac_height_ie6").parent().show();
					}
				},function(){
					$(".empty_cart").hide();
					$(".mac_height_ie6").parent().hide();
				});
			//购物车数量
			if(data === null || data.length === 0){
				$(".mgj-my-cart").find(".num").hide();
			}
			else{
				$(".mgj-my-cart").find(".num").show().text(data.length);
			}	
			}
	});
	//删除购物车的函数
	function deleteRow($row,index){
			$.ajax({
				type:"post",
				url:"php/addCart.php",
				async:true,
				data:{"type":"delete","index":index},
				success:function(data){
					$row.remove().fadeOut("slow");
				}
			});
		}
	
	//全部分类
	var liHeight = $(".nav-list li").eq(0).height();
	$(".nav-list li").each(function(index,element){
		$(this).hover(function(){
			var index = $(this).index();
			$(this).addClass("primary_nav_li_current").siblings().removeClass("primary_nav_li_current");
			$(this).parents(".cont-left").addClass("primary_nav_list_current");
			$(this).children(".nav-more").stop(true).show().css({top:-index * liHeight});
			// console.log(index);
		},function(){
			$(this).removeClass("primary_nav_li_current");
			$(this).find(".nav-more").stop(true).hide();
			$(this).parents(".cont-left").removeClass("primary_nav_list_current");
		});
	});
	

	
	//搜商品
	$(".search-select").hover(function(){
		$(this).find("ol").show();
		$(this).find("ol").children().on("click",function(){
			$(".selected").text("搜"+$(this).find("a").text());
		});
	},function(){
		$(this).find("ol").hide();
	});

	//轮播图
	$(window).on("load",function(){
		$.get(
			"json/index.json",
			function(data){
				var html = "";
				for(var i = 0;i<data.lunbo.length;i++){
					
					html += "<li><img src='"+data.lunbo[i]+"' alt='' /></li>";
						
				}
				$(html).appendTo("#box");
					/*///////////////////////////*/
					var liWidth = $("#box li:first").width(),
						liLen = $("#box li").length,
						newLen,
						index = 2,
						isMoving = false;
						timer = null;
					$("#box li:last").clone(true).prependTo("#box");
					$("#box li").eq(1).clone(true).appendTo("#box");
					newLen = liLen + 2;
					//设置box的宽度
					$("#box").width(newLen * liWidth);
					//初始化显示
					$("#box").css("left",-liWidth);
					//为pages添加小圆点
					for(var i = 0;i<liLen;i++){
						var html = "<a class='dont_default' href='javascript:;'><img class='don_show_img' src='img/lb40x40.png' alt='' /></a>";
						$(html).appendTo(".pages");
					}
					//鼠标hover#box时翻页的隐藏于显示
					$("#box").hover(function(){
						clearInterval(timer);
						$(".prev,.next").stop(true).show();
					},function(){
						$(".prev,.next").stop(true).hide();
						clearInterval(timer);
						timer = setInterval(move,5000);
					});
					//上一页
					$(".prev").on("click",function(){
						clearInterval(timer);
						index -= 2;
						move();
					});
					//下一页
					$(".next").on("click",function(){
						clearInterval(timer);
						move();
					});
					//小圆点的hover事件
					$(".pages a").on("mouseover",function(){
						if(!isMoving){
							clearInterval(timer);
							index = $(this).index() + 1;
							move();
						}
					});
					//运动
					function move(){
						var _left = -liWidth * index;

						var circleIndex = index === 0 ? newLen - 3 : (index === newLen -1 ? 0 :index - 1);
						$(".pages a").eq(circleIndex).children().addClass("don_show_img").parent().siblings().find("img").removeClass("don_show_img");
						index++;

						$("#box").stop(true).animate({left:_left},800,function(){
							if(index === newLen){
								$("#box").css("left",-liWidth);
								index = 2;
							}
							else if(index === 1){
								$("#box").css("left",-(newLen - 2) * liWidth);
								index = newLen - 1;
							}
						});
						
					}

					timer = setInterval(move,5000);
					move();
			}
		);
		
	});
	

		var liHeight = $(".nav-list li").height();
			//轮播图右侧栏图片
			$.get(
					"json/index.json",
					function(data){
						var right_pic = data.right_pic;
						for(var i = 0;i< right_pic.length;i++){
							$(".sale-li").eq(i).find("img").attr("src",right_pic[i]);
						}

					}
				);

		//固定搜索
		var winHeight = $(window).height(),
			headerHeight = $(".header-top").height(),
			heaMidHeight = $(".header-mid").height(),
			contHeight = $(".content").height(),
			wrapHeight = $(".wrap_spacial_con").height(),
			height = headerHeight + heaMidHeight + contHeight + wrapHeight;
		$(window).on("scroll",function(){
			var scrollTop = $(this).scrollTop();
			if(scrollTop > height - winHeight){
				$(".search_container").stop(true).show();
			}
			else{
				
				$(".search_container").stop(true).hide();
			
			}
		});
		
		$.get(
			"json/index.json",
			function(data){
				var wrap_pic = data.wrap_spacial_con;
				for(var i = 0;i<wrap_pic.length;i++){
					$(".wrap_spacial_con").find("img").eq(i).attr("src",wrap_pic[i]);
				}
			}
			);

		$.get(
				"json/index.json",
				function(data){
					var wrap_subOne = data.wrap_subOne;
					//专题
				for(var j = 0;j<2;j++){
					$(".coverd_con").find("img").eq(j).attr("src",wrap_subOne[j]);
				}
				for(var i = 2;i<5;i++){
					$(".col1-row1").eq(i-2).find("img").attr("src",wrap_subOne[i]);
				}
				for(var i = 5;i<wrap_subOne.length;i++){
					$(".npt1_pic1").eq(i-5).find("img").attr("src",wrap_subOne[i]);

				}

				var mogu_LP = data.MUGU_LP;
				$.each(mogu_LP,function(index,element){
					$("<li><a href='javascript:;'>"+element+"</a></li>").appendTo(".btm_txt_con");
				});
				var ad_up = data.goods_fav[0].ad_up;
				$(".ad_up").find("img").attr("src",ad_up);
				var brand_list = data.goods_fav[1].ad_btm_item;
				for(var i = 0;i<brand_list.length;i++){
							$("<a class='ad_btm_item' href='javascript:;'><img src='"+brand_list[i]+"'/><span class='a-hover'></span></a>").appendTo(".npt1-con1");
				}
				//
				var big_img = data.goods_fav[2].big_img;
				$(".col_long_pic").find("img").attr("src",big_img);
				var goods_list = data.goods_fav[3].goods_list;
				$.each(goods_list,function(index,element){
					$element = $(".a1:first").clone(true).addClass("goods_item").appendTo(".goods_list").show()
											.find("img").attr("src",element.img_path).parent()
											.find(".goods_name_sc").text(element.title);
				});

			});


			//搜索框
		$(".txt").on("keyup",function(){
			$(".form_text").show();
		});	




		//加载更多信息
		$(window).on("load",function(){
			var winHeight = $(window).height(),
				floorHeight = $("#floor_list").position().top + $("#floor_list").height(),
				isLoading = false;
			$(window).on("scroll",function(){
				var scTop = $(this).scrollTop();
				if(scTop > winHeight - floorHeight && !isLoading){
					$.get("json/index.json",function(data){
						var goods_list = data.goods_list;
						 $(".npt1_2:first").clone(true).appendTo("#floor_list")
						.find(".ad_up").find("img").attr("src",goods_list[0].ad_up).parents(".npt1-con1")
						.next().find(".col_long_pic").find("img").attr("src",goods_list[2].big_img);
						
						var goods_brand = goods_list[1].ad_btm_item;
						var $Brand = $(".npt1_2").eq(1).find(".ad_btm_item");
						$.each(goods_brand,function(index,goods){
								$Brand.eq(index).find("img").attr("src",goods);
						});

						var goods_list = goods_list[3].goods_list;
						var $Goods = $(".npt1_2").eq(1).find(".goods_item");
						$.each(goods_list,function(index,list){
							$Goods.eq(index).find("img").attr("src",list.img_path).next()
							.find(".goods_name_sc").text(list.title);
						});
						$(".npt1_1:first").clone(true).appendTo("#floor_list");
						$(".npt1_2:first").clone(true).appendTo("#floor_list");
					});
					isLoading = true;
				}
			});
		});	
});











