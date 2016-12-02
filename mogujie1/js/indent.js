$(function(){
	
		$.get(
		"../json/address.json",
		function(data){
			var html = "";
			for(var i = 0;i<data.regions.length;i++){
				html += "<option id="+ data.regions[i].id+">"+ data.regions[i].name +"</option>";
			}
			$(html).appendTo(".J_province");
		}
	);
	$(".J_province").on("change",function(){
		var pId = $(".J_province option:selected").index();
		$.get(
		"../json/address.json",
		function(data){
			var html = "";
			for(var i = 0;i<data.regions[pId].regions.length;i++){
				html += "<option>"+ data.regions[pId].regions[i].name +"</option>";
			}
			$(".J_city").html(html);
		}
	);
	});
	
	$(".J_city").on("change",function(){
		var pId =  $(".J_province option:selected").index();
		var aId = $(".J_city option:selected").index();
		$.get(
		"../json/address.json",
		function(data){
			var html = "";
			for(var i = 0;i<data.regions[pId].regions[aId].regions.length;i++){
				html += "<option>"+ data.regions[pId].regions[aId].regions[i].name +"</option>";
			}
			$(".J_area").html(html);
		}
	);
	});
	
	$("input,textarea").on("focusout",function(){
		if(!$(this).val()){
			$(this).addClass("error").siblings("span").addClass("notice");
		}
		else{
			$(this).removeClass("error").siblings("span").removeClass("notice");
		}
	});
	
	$(".realPhone").on("focusout",function(){
		var reg =   /^[1-3]\d{10}$/;
		if(!reg.test($(this).val())){
			$(".real").stop(true).show();
			$(this).siblings(".prompt").hide();
		}
		else{
			$(".real").stop(true).hide();
			$(this).siblings(".prompt").show();
		}
	});
	
	/*对地址的操作*/
	/////////////////////////////////////////////////
	//////////////////////////////////////////////////////
	//////////////////////////////////////////////////////
	//添加地址
	$(".cart_address_card").on("click",function(){
		$(this).addClass("selected").parent().siblings("li").find(".cart_address_card").removeClass("selected");
		
	});
	$(".cart_address_card").hover(function(){
		$(this).find(".cart_address_edit").show();
	},function(){
		$(this).find(".cart_address_edit").stop(true).hide();
	});
	//当用户没有填写地址时，显示添加地址部分
	$.ajax({
			type:"post",
			url:"../json/indent.json",
			async:true,
			success:function(data){
				if(data === null || data.length === 0){
					$("#J_otherAddress").show();
					$(".cart_address_list").hide();
				}
				else{
					$.each(data,function(index,element){
					$(".cart_address_list").find("li:eq(0)").clone(true).appendTo(".cart_address_list").show().parents(".cart_address_list").find("li:eq("+(index+1)+")")
						.find(".cart_address_tit").text(element.address.oRealName)
						.next().text(element.address.oTextArea)
						.next().text(element.address.province+element.address.city+element.address.oArea+" "+element.address.oText)
						.next().text(element.address.oRealPhone);
					});
					$(".cart_address_list").show();
					$("#J_otherAddress").hide();
					$(".cart_address_list").children("li").eq(1).children("a").addClass("selected").parent().siblings().children().removeClass("selected");
				}
			}
	});

	

	

	//使用新地址
	$(".addOtherAddress").on("click",function(index,element){
		$("#J_otherAddress").show();
	});

	////点击确定按钮保存地址
		$(".J_okbtn").on("click",function(){
			var province = $(".J_province").val(),//省
				city = $(".J_city").val(),//市
				oArea = $(".J_area").val(),//区
				oText = $(".text1").val(),//邮编
				oTextArea = $(".textarea").val(),//街道地址
				oRealName = $(".realName").val(),//姓名
				oRealPhone = $(".realPhone").val();//电话号码
				
			var address = {
				province : province,
				city : city,
				oArea : oArea,
				oText : oText,
				oTextArea : oTextArea,
				oRealName : oRealName,
				oRealPhone : oRealPhone
			}

			//将address添加至json文件中
			addAddress(address);
			$.ajax({
				url:"../json/indent.json",
				success:function(data){
					var index = $(".cart_address_list li").length;
					console.log(index);
					$(".cart_address_list").find("li:eq(0)").clone(true).appendTo(".cart_address_list").show().parents(".cart_address_list").find("li:eq("+(index)+")")
					.find(".cart_address_tit").text(address.oRealName)
					.next().text(address.oTextArea)
					.next().text(address.province+address.city+address.oArea+" "+address.oText)
					.next().text(address.oRealPhone);
					$(".cart_address_list").show();
					$("#J_otherAddress").hide();
				}
			});
		});

		//增加地址信息
		function addAddress(address){
			$.ajax({
				type:"post",
				url:"../php/addAddress.php",
				async:true,
				data:{"type":"addAddress","address":address},
				success:function(data){
				}
			});
		}
		
	
	$(".cancel_btn").on("click",function(){
		$("#J_otherAddress").hide();
	});

///////////////////////////////////////////////////
///商品信息
	$.ajax({
		url:"../json/order.json",
		success:function(data){
			$.each(data,function(index,cartinfo){
				var element = cartinfo.info;
				$(".table tbody").find("tr:eq(0),tr:eq(1)").clone(true).insertBefore(".cart_other").show().parents(".table tbody").data("cartInfo",element)
					.find(".cart_group_head .shop_name").eq(index+1).text(element.name).parents("tr")
					.next().find(".cart_wear img").attr("src",element.imgSrc).parent()
					.next().text(element.title).parents("td").next().find("p:eq(0) span").text(element.color).parent().next().find("span").text(element.sizeCurr).parents("td")
					.next().find("span").text(element.priceNext).parent()
					.next().find("span").text(element.count).parent()
					.next().children("span").children("span").text(Math.round((element.pricePrev - element.priceNext)*100) / 100).parents("td")
					.next().find("span").text(Math.round(element.priceNext * element.count * 100) / 100).parents(".table tbody")
					;	
			})
			//商品数量
			$(".goodsNum").text(data.length);
			var total = 0;
			$(".small_total:not(:first)").each(function(index,element){
				total +=parseFloat($(this).text());
			})
			$(".cart_sum").text( Math.round(total * 100) / 100);
			$(".goodsSum").text(Math.round(total * 100) / 100);
		}
	});	
});
