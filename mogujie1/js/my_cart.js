$(function(){
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
	//点击关闭
	$(".close").on("click",function(){
		$(".cart_hidden").stop(true).hide();
	});
	//handHover(".cart_tip_hd",".cart_hidden");
	
	//有bugger
	$(".cart_slide_item").on("click",function(){
		$(this).addClass("cart_slide_item_curr");
		$(this).parent("li").siblings("li").children(".cart_slide_item").removeClass(".cart_slide_item_curr");
		
	});
	/*************************************************/
	/***********************显示购物车信息**************************/
	/*************************************************/
	$.ajax({
		type:"post",
		url:"../json/my_cart.json",
		async:true,
		success:function(data){
			$.each(data,function(index,element){
				$element = $(".cart_table tbody").find("tr:eq(0),tr:eq(1)").clone(true).addClass("shoptit_shop").appendTo(".cart_table tbody").data("cartinfo",element).show()
				.find(".cart_group_head .cart_hoverline").text(element.cartinfo.name).parent().parent()
				.next().find(".cartImgTip").attr("src",element.cartinfo.imgSrc)
				.parent().next().text(element.cartinfo.title)
				.parent().next().find(".cart_color").text(element.cartinfo.color)
				.parent().next().find(".cart_size").text(element.cartinfo.sizeCurr)
				.parent().parent().next().find(".cart_throughline").text(element.cartinfo.pricePrev)
				.next().text(element.cartinfo.priceNext).next().find(".cart_tip_focuse")
				.text(Math.round((element.cartinfo.priceNext / element.cartinfo.pricePrev)*10))
				.parent().parent().parent().next().find(".cart_num_input").val(element.cartinfo.count)
				.parents(".cart_alcenter").next().find(".item_sum").text(Math.round(element.cartinfo.priceNext * element.cartinfo.count *100) / 100);
				

				/*$(".delete").on("click",function(){
					$row = $(this).parents(".shoptit_shop");
					$row.prev().remove();
					deleteInfo($row);
				});*/
			});
				//删除
				$(".delete").each(function(index,element){
					$(this).on("click",function(){
						var $row = $(this).parents(".shoptit_shop");
						$row.prev().remove();
						deleteInfo($row,index - 1);
					});
				});

				// 单选框
				$("input[type='checkbox']").on("click",function(){
					checked();
				});
				$(".cart_paybtn").on("click",function(){
					if($(".checked").length > 0){
						
						var	$row = $(".checked").parents(".shoptit_shop");
						var info = $row.data("cartinfo").cartinfo;
						$.getJSON({
							type:"post",
							url:"../php/order.php",
							async:true,
							data:{"type":"order","info":info},
							success:function(data){
							}
						});
						window.location.href = "indent.html";
					}
					else{
						alert("亲，你还没有选择待付款的宝贝哦！");
					}
				});
		}
	});
	//判断checkbox是否被选中
	function checked(){
		if($("input[type='checkbox']").is(":checked")){
			$(this).addClass("checked");
		}else{
			$("input[type='checkbox']").removeClass("checked");
		}
	}

	//清空购物车
	$("#cartRemoveChecked").on("click",function(){
		$.getJSON({
			type:"post",
			url:"../php/addCart.php",
			async:true,
			data:{"type":"clearAll"},
			success:function(data){
			}
		});
		$(".cart_table tbody").remove();
	});
	function cartInfoAmount(){
		var num = $(".cart_thcheck:checked").length;
		$(".goodsNum").text(num);
		return num;
	}
	//删除的封装函数
	function deleteInfo($row,index){
		$.ajax({
			type:"post",
			url:"../php/addCart.php",
			async:true,
			data:{"type":"delete","index":index},
			success:function(data){
				$row.remove();
			}

		});
	}
	//全选
	$("input[name='s_all']").on("click",function(){
		$(".tr_checkmr").prop("checked",$(this).prop("checked"));
		$(".s_all_slave").prop("checked",$(this).prop("checked"));
		$("input:checkbox").addClass("checked");
		calcTotal();
		cartInfoAmount();
	});
	$("input:checkbox").on("click",function(){
		$("input[name='s_all']").prop("checked",$("input:checkbox:checked").length === $("input:checkbox").length ? true : false);
		calcTotal();
		cartInfoAmount();
		payBtn();
	});

	//单选
	$(".s_shopall").on("click",function(){
		$(this).parents(".shoptit_shop").next().find(".cart_thcheck").prop("checked",$(this).prop("checked"));
		calcTotal();
		cartInfoAmount();
	});
	$(".cart_thcheck").on("click",function(){
		$(this).parents(".shoptit_shop").prev().find(".s_shopall").prop("checked",$(this).prop("checked"));
		calcTotal();
		cartInfoAmount();
	});
	
	//add
	$(".cart_num_add").on("click",function(){
		var amount = $(this).prev(".cart_num_input").val();
		amount++;
		$(this).prev(".cart_num_input").val(amount);
		$(this).parents(".shoptit_shop").data("cartInfo").count = amount;
		$.cookie("cartInfos",cartInfos,{expries:7,path:"/"});
		calcTotal();
	});
	//reduce
	$(".cart_num_reduce").on("click",function(){
		var amount = $(this).prev().prev(".cart_num_input").val();
		if(amount <= 1){
			amount = 1;
			$(this).addClass("disable");
		}
		else{
			$(this).removeClass("disable");
			amount--;
			$(this).prev().prev(".cart_num_input").val(amount);
			$(this).parents(".shoptit_shop").data("cartInfo").count = amount;
			$.cookie("cartInfos",cartInfos,{expries:7,path:"/"});
			
		}
		calcTotal();
		
	});
	//小计
	
	
	//bottom
	var _height = $(".header_2015").height() + $(".g-header").height() + $(".cart_wrap").height(),
		winHeight = $(window).height();
	
	$(window).on("scroll",function(){
		var _scrollTop = $(this).scrollTop();
		if(_scrollTop < _height - winHeight){
			$(".cart_paybar").addClass("cart_fix").end();
		}
		else{
			$(".cart_paybar").removeClass("cart_fix");
		}
	});
	
	//小计
	$(".cart_num_add,.cart_num_reduce").on("click",function(){
		var num = $(this).parent().find(".cart_num_input").val();
		var price = parseFloat($(this).parents(".cart_alcenter").prev().children(".cart_data_sprice").text().slice(1));
		var sum = Math.round(num * price * 100) / 100;
		$(this).parent().parent().parent().next().find(".item_sum").text(sum);
		calcTotal();
	});
	
		
		$(".cart_thcheck").on("click",function(){
			/*var str = parseFloat($(this).parent().siblings(".cart_alcenter").find(".item_sum").text());
			total += str;
			$(".goodsSum").text(total);*/
			calcTotal();
		});
		
	
	
	
		// 计算合计金额
			function calcTotal() {
				var total = 0;
				$(".cart_thcheck:checked").parents(".shoptit_shop").find(".item_sum").each(function(index, element){
					total += parseFloat($(this).text());
				});
				total = Math.round(total * 100) / 100;
				// 显示合计金额
				$(".goodsSum").text(total);
			}
	
	//有勾选显示“去付款”
	
	function payBtn(){
		if($("input:checkbox").is(":checked")){
			$(".cart_paybtn").removeClass("cart_paybtn_disable").css("text-indent",1000);
			$("input:checkbox:checked").each(function(){
				if($(this).is(":checked")){
					$(this).addClass("checked");
				}else{
					$(this).removeClass("checked");
				}
			});
		}
		else{
			$(".cart_paybtn").addClass("cart_paybtn_disable");
		}
	}
		
	// 遍历勾选的单选框
	// $("input")
	

});

	


	

















