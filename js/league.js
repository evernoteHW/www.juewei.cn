$(function(){
	var info = ["用户名不正确,请输入中文或者英文",
				"手机号不正确,请输入11位数字",
				"身份证号不正确,请输入身份证号码",
				"经营面积不正确,请输入数字",
				"地址不正确哦,请输入地址",
				"必填项,不能为空"
	]
	var res = [	/^[A-Za-z0-9]{2,30}$|^[\u4E00-\u9FA5]{1,5}/,
				/^\d{11}$/,
				/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/,
				/^\d{1,10}$/,
				/[^\x00-\xff]|[A-Za-z0-9_]/ig,
				/.{1,200}/
				];
	var allTrue = true;

	// 验证函数
	function provings(name,re,info,indent) {
		if (!re.test(name.val())) {
			allTrue = false;
			alert(info)
			return false;
		}
		return true;
	} 
	// 城市二级联动
	function pro() {
		$.ajax({
			url: "http://fensi.juewei.com/subscribe/storesuser/getStoreProv",
			type: "post",
			data: {},
			dataType:"json",
			success:function(res) {
				var len = res.data.length;
				for(var i = 0; i < len; i++) {
					$("#pro").append('<option value="'+ res.data[i].provinceID + '">'+ res.data[i].province +'</option>')
				}
			}
		})
	}
	pro();
	$("#pro").click(function(){
		if($('#pro>option').length <= 1){
			alert('对不起，您的浏览器版本过低，请选择其他浏览器')
		}
	})

	// 城市
	$("#pro").change(function(){
		$.ajax({
			url: "http://fensi.juewei.com/subscribe/storesuser/getstorecity",
			type: "post",
			data: {
				provId: $("#pro").val()
			},
			dataType:"json",
			success:function(res) {
				$("#proInfo").hide();
				var len = res.data.length;
				$("#city").empty();
				for(var i = 0; i < len; i++) {
					$("#city").append('<option value="'+ res.data[i].cityID + '">'+ res.data[i].city +'</option>')
				}
			}
		})
	})

	// 上传图片并显示图片
	function PreviewImage(imgFile, show, num) {
    	// 判断格式
	    var filextension = imgFile.value.substring(imgFile.value.lastIndexOf("."),imgFile.value.length);
	    filextension = filextension.toLowerCase();
	    if ((filextension != '.jpg') && (filextension != '.gif') && (filextension != '.jpeg') && (filextension != '.png') && (filextension != '.bmp')) {
	        alert("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 !");
	        return;
	    }

        // 添加多图
        if (num < 5) {
        	$(imgFile).after('<em class="Del"></em>');
        	if (num[0] < 5) {
				$(imgFile).parent().before('<div id="storePicShow'+num[0]+'"><span> 最多5张</span><input type="file" name="storePic'+num[0]+'" id="storePic'+num[0]+'" required /></div>')
				onchanges($("#storePic"+num[0]),"storePicShow"+num[0],num)
        	}else {
        		if($(imgFile).parents("#addPic").children().eq(1).attr("id") == $(imgFile).parent().attr("id")) {
	        		$(imgFile).parent().before('<div id="storePicShow'+num[0]+'"><span> 最多5张</span><input type="file" name="storePic'+num[0]+'" id="storePic'+num[0]+'" required /></div>')
					onchanges($("#storePic"+num[0]),"storePicShow"+num[0],num)
	        	}else {
	        		num[0]--;
	        	}
        	};
			num[0]++;
        }else if(num == 5) {
        	$(imgFile).after('<em class="Del"></em>');
        }
        //移除文字
        $(imgFile).siblings("span").remove();
        //不可点击
        $(imgFile).siblings("img").remove();
        //显示图片
        
		if(imgFile.files && imgFile.files[0]){ 
			var path;
			if (window.navigator.userAgent.indexOf("Chrome") >= 1 || window.navigator.userAgent.indexOf("Safari") >= 1) { 
				// chrome or safaei
				path = window.webkitURL.createObjectURL(imgFile.files[0]); 
			} else { 
				//火狐下，直接设img属性
				path = window.URL.createObjectURL(imgFile.files[0]); 
			}
			$(imgFile).after("<img class='img1' src='"+path+"'/>");
		}else{ 
			// ie 的情况
			alert('对不起，您的浏览器版本过低，请选择其他浏览器')
			return;
		}
	}
	$(document).click(function(event){
		if ($(event.target).attr("class") == "Del") {
			num[0]--;
			if ( num[0] == 0 ) {
				num[0]++;
				$(event.target).parent().before('<div id="storePicShow"><span>最多5张</span><input type="file" name="storePic" id="storePic"  /></div>')
			}
			$(event.target).parent().remove();
		};
	})
	// 身份证上传
	$("#idPicHeads").change(function() {
		PreviewImage(this,"idPicShowO");
		$("#idPicHeadsInfo").hide();
		
	})
	$("#idPicTails").change(function() {
		PreviewImage(this,"idPicShowT")
		$("#idPicHeadsInfo").hide();
	})
	//是否有店面
	var store = 1 ;
	$("#storeNum").on("click",function(event){
		if ($(event.target).attr("class") == "istore-y" ) {
			$("#store").addClass("comselect").css({'border': '0'})
			$("#noStore").removeClass("comselect").css({'border': '1px solid #999999'});
			store = 1;
			$("#StoreArea").fadeIn();
			$("#add").fadeIn();
			$("#addPic").fadeIn();
			$("#buLi").fadeIn();
		}else if ($(event.target).attr("class") == "istore-n" ){
			store = 0;
			$("#noStore").addClass("comselect").css({'border': '0'})
			$("#store").removeClass("comselect").css({'border': '1px solid #999999'})

			$("#StoreArea").fadeOut();
			$("#add").fadeOut();
			$("#addPic").fadeOut();
			$("#buLi").fadeOut();
		};
	})

	//上传门店照片
	var num = [1]; //照片的张数
	$(document).on("change",function(event){
		if ($(event.target).attr("id") == "storePic" ){
			PreviewImage(event.target,"storePicShow",num);
			$("#storePicInfo").hide();
		}
	})
	function onchanges(obj,show,num) {
		obj.change(function() {
			PreviewImage(this,show,num);
		})
	}
	//营业执照
	$("#businessLicence").change(function() {
		PreviewImage(this,"buLiShow");
		$("#buLiInfo").hide();
	})
	// 提交
	function yes(a) {
		if(a.length) {
			return a.prop("files")[0] || a[0].files[0];
		}else {
			return 0;
		}
	}

	// 表单提交
	$("#subMit").on("click",function(){
		allTrue = true;
		if(!provings($("#userName"),res[0],info[0],4)) return;
		if(!provings($("#cellphone"),res[1],info[1],4)) return;
		if(!provings($("#userId"),res[2],info[2],7)) return;
		if(!provings($("#message"),res[5],'留言内容'+info[5],7)) return;
		// 身份证照片
		if ($("#idPicHeads").val() && $("#idPicTails").val() ) {
			$("#idPicHeadsInfo").hide();
		} else {
			alert('身份证照片必须两面都有');
			return;
		};

		if (store) {
			// 地址
			if(!provings($("#address"),res[4],info[4],7)) return;
			// 省市
			if ($("#pro").val() == 0) {
				alert('城市地址不能为空')
				return;
			}
			// 营业执照
			if (!$("#businessLicence").val()) {
				alert('缺少营业执照一张')
				return;
			}
			if(!$('#acreage').val()){
				alert('请输入经营面积')
				return;
			}
		}
		if (allTrue) {
			$('#subMit').text('发送请求中..')
			allTrue = false;
			var imgval1 = yes($("#idPicHeads"));
			var imgval2 = yes($("#idPicTails"));
			var imgval3 = yes($("#storePic"));
			var imgval4 = yes($("#storePic1"));
			var imgval5 = yes($("#storePic2"));
			var imgval6 = yes($("#storePic3"));
			var imgval7 = yes($("#storePic4"));
			var imgval8 = yes($("#licenseImgOne"));

			// 店面照片
			if (store && !imgval3 && !imgval4 && !imgval5 && !imgval6 && !imgval7) {
				alert('门店照片至少一张')
				return;
			}
			var fb1 = new FormData();
			fb1.append("card_img",imgval1);
			fb1.append("card_img2",imgval2);
			fb1.append("name", $("#userName").val());
			fb1.append("phone",$("#cellphone").val());
			fb1.append("provinceID",$("#pro").val());
			fb1.append("cityID",$("#city").val());
			fb1.append("id_card",$("#userId").val());
			fb1.append("is_store",store);
			fb1.append("store_img1",imgval3);
			fb1.append("store_img2",imgval4);
			fb1.append("store_img3",imgval5);
			fb1.append("store_img4",imgval6);
			fb1.append("store_img5",imgval7);
			fb1.append("license_img1",imgval8);
			fb1.append("extra", $("#message").val());
			var xhr = new XMLHttpRequest();
			xhr.open('post',"http://fensi.juewei.com/subscribe/StoresTest/insertStoreUser");
			xhr.onreadystatechange = function() {
     			if (xhr.readyState != 4) return;
      			if (xhr.status == 200 ) {
      				$('#subMit').text('提交')
         			var res = JSON.parse(xhr.responseText);
					allTrue = true;
					if (res.code == "201") {
						alert(res.msg)
					}else if(res.code == "202") {
						alert('感谢您的加盟，稍后客服会联系您。');
						setTimeout(function(){
							window.location = 'index.html'/*tpa=http://www.juewei.cn/js/index.html*/;
						},3000)
					}else {
						alert(res.msg)
					};
				}
     		}
			xhr.send(fb1)	
		};
	})
})
