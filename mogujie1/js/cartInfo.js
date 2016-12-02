$(function(){
	//如果购物车不为空
	$.ajax({
			type:"post",
			url:"../json/my_cart.json",
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
				url:"../php/addCart.php",
				async:true,
				data:{"type":"delete","index":index},
				success:function(data){
					$row.remove().fadeOut("slow");
				}
			});
		}
});