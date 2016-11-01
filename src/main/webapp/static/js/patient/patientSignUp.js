var phoneNumExist = true;
	var countdown=60;
	var timeOut;
	function settime() {
		if (countdown == 0) {
	            $("#getVerifyCode").attr("disabled",false);
	          	$("#getVerifyCode").text("获取验证码");
	          	countdown = 60;
	          	return;
	        } else {
	        	$("#getVerifyCode").attr("disabled", true);
	        	$("#getVerifyCode").text("重新发送(" + countdown + ")");
	            countdown--;
	        }
		timeOut = setTimeout(function() {
	            settime();
	        },1000)
	}
	
	function getUrlParam(name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	    var  r = window.location.search.substr(1).match(reg);
	    if (r != null) return unescape(r[2]); return null;
	}
	
	//获取验证码
	function getVerifyCode() {
		settime();
		
		var getVerifyCodeUrl = $("#basePath").val()+"/patient/getVerifyCode/"+$("#phoneNum").val().trim();
		$.ajax({
  			url : getVerifyCodeUrl,
  			type : 'get',
  			cache : false,
  			dataType : 'json',
  			success : function(data) {
  				if(data.result == 'success') {
  					$("#warn").text("验证码已下发到您的手机,请注意查收");//verifyCode="+data.verifyCode
  					return;
  				}else if(data.result == 'accountExist') {
  					layer.alert("您输入的手机号码已存在");
  					countdown=60;
  					clearTimeout(timeOut); 
  					$("#getVerifyCode").attr("disabled",false);
  			      	$("#getVerifyCode").text("获取验证码");
  					return;
  				}else if("formatErr" == data.result) {
  					$("#warn").text("请输入正确手机号");
  					 $("#getVerifyCode").attr("disabled",false);
  					countdown=60;
  					clearTimeout(timeOut); 
  					return;
  				}else if("getVerifyCodeLimit" == data.result) {
  					/*$("#validVerifyCodeModalContent").text("该手机号码今天接收验证码数目已达上限");//这里用得是signUpPage内的signSuccessModal模态框不是公共的
					$('#validVerifyCodeModal').modal({backdrop: 'static', keyboard: false});
					$("#validVerifyCodeModal").modal("show");*/
  					layer.alert("该手机号码今天接收验证码数目已达上限");
  				}
  			},
  			error : function(data) {
  				$("#warn").text("失败，请稍后再试。");
  			}
  		});  
	}
	
	//验证用户名是否已存在
	function verifyPatientNameExist() {
		var patientName = $("#patientName").val().trim();
		var verifyPatientNameExistUrl = "patient/existPatientName/"+patientName;
		 $.ajax({
  			url : verifyPatientNameExistUrl,
  			type : 'get',
  			cache : false,
  			dataType : 'json',
  			success : function(data) {
  				if(data.result == 'exist') {
					$("#warn").text("用户名已存在");	
					
  					return;
  				}else {
  					
  				}
  			},
  			error : function(data) {
  				$("#warn").text("验证用户名失败，请稍后再试。");
  			}
  		});  
	}
	
	//提交数据注册,用户名,手机号,验证码,密码
	function signUp() {
		//$("#warn").text("验证中...");
		$("#dataSubmit").show();
		var signUpUrl = $("#basePath").val()+"/patient/signUp";
		 $.ajax({
	  			url : signUpUrl,
	  			type : 'post',
	  			cache : false,
	  			contentType: "application/json",
	  			dataType : 'json',
  			 	data : JSON.stringify({
	     		      'patientname' : $("#patientName").val().trim(),
	     		      'phonenum' : $("#phoneNum").val().trim(),
	     		      'verifyCode' : $("#verifyCode").val().trim(),
	     		      'password' : $.md5($("#passWord").val().trim()),
	     		      /*'age':$("#age").val(),*/
	     		      'sex':$('input:radio[name=Sex]:checked').val(),
	     		      'idcard':$("#idcard").val()
	     	     }),
	  			success : function(data) {
	  				$("#dataSubmit").hide();
	  				if(data.result == 'success') {
	  					/*$("#singleBtnModalContent").text("注册绑定成功");
  						$('#singleBtnModal').modal({backdrop: 'static', keyboard: false});
  						$("#singleBtnModal").modal("show");*/
	  					layer.alert("注册绑定成功",function() {
	  						window.location.href=  $("#redirectUrl").val();
	  					});
	  					//showMaskAlert();
	  				}else if("openInWeixinPlease" == data.result) {
	  					/*$("#singleBtnModalContent").text("请在微信中打开");
  						$('#singleBtnModal').modal({backdrop: 'static', keyboard: false});
  						$("#singleBtnModal").modal("show");*/
	  					layer.alert("请在微信中打开");
	  				}else if(data.result == 'exist') {
	  					/*$("#warn").text("用户已存在");*/
	  					layer.alert("用户已存在");
	  					//$("#2btnModalContent").text("该用户已存在");
	  				}else if(data.result == 'fail') {
	  					/*$("#warn").text("注册失败");*/
	  					layer.alert("注册失败");
	  				}else if(data.result == 'verifyError') {
	  					/*$("#warn").text("验证码错误");*/
	  					layer.alert("验证码错误");
	  				}
	  			},
	  			error : function(data) {
	  				$("#dataSubmit").hide();
	  				/*$("#warn").text("注册失败");*/
	  				layer.alert("注册失败");
	  			}
	  		});  
	}
	function checkMobile(phoneNum) {
		if(!(/^1[3|4|5|7|8]\d{9}$/.test(phoneNum))){ 
	        return false; 
	    } 
		return true;
	}
	
	function initAge() {
	      var min = 1; max = 100;
	      var age = "";
	      for(var i=min;i<=max;i++) {
	    	 // age += "<li><a id="+i+">"+i+"岁</a></li> <li class='divider'></li>";
	    	  age += "<li><a id="+i+" style='margin-left:6px;'>"+i+"<span style='margin-left:5px;'>&nbsp;岁<span></span></a></li> <li class='divider'></li>";
	      }
	      $("#ageUl").html(age);
	      $("#ageUl").find("li>a").click(function() {
	    	  var t = $(this).text();
	    	  var num  = $(this).attr("id");
	    	  console.log("t="+t+",age="+num);
	    	  $("#ageDesc").text(t);
	    	  $("#age").val(num);
	    	  var curYear = new Date().getFullYear();
	    	 // alert(curYear*1 - num*1);
	    	//	$("#ageBtn").css({"border": "none"})
	    	  $("#birthYear").text(curYear*1 - num*1);
	      })
	}
	
	$(function() {
		var redirectUrl = getUrlParam("redirectUrl");
		if(redirectUrl != undefined && redirectUrl != "") {
			$("#redirectUrl").val(redirectUrl);
		}
		
		$("#alreadyBindModalBtn").click(function() {
			$("#alreadyBindModal").modal("hide");
			WeixinJSBridge.call('closeWindow');
		})
		
		$("#existBindPleaseModel-leftBtn").click(function() {
			$("#existBindPleaseModel").modal("hide");
			WeixinJSBridge.call('closeWindow');
		})
		
		$("#existBindPleaseModel-rightBtn").click(function() {//
			window.location.href="patient/wxBindPage";
		})
		
		
		$('#sexRadioGroup input').on('ifChecked', function(event){
			//console.log(event.target.value)
			
		}).iCheck({
			  checkboxClass: 'icheckbox_square-blue',
			  radioClass: 'iradio_square-blue',
			  increaseArea: '20%'
		});
		
	
		
		$("#validVerifyCodeModalBtn").text("确定").click(function() {
			$("#validVerifyCodeModal").modal("hide");
		})
		
		
		$("#singleBtn").text("确定").click(function() {
   		 	WeixinJSBridge.call('closeWindow');
		});
	
		$("#age2").blur(function() {
			$("#myform").valid();
		});
		$("#phoneNum").blur(function() {
			$("#myform").valid();
		});
		
		$("#verifyCode").blur(function() {
			$("#myform").valid();
		});
		$("#passWord").blur(function() {
			$("#myform").valid();
		});
		
		
		//获取验证码
		$("#getVerifyCode").click(function() {
			 var error =  "<label class='error' id='phoneError' generated='true' for='phoneNum'>无效的手机号码</label>";
			
			var phoneNum = $("#phoneNum").val();
			if(!checkMobile(phoneNum)) {
				if(!$("#phoneNum").hasClass("error")) {
					if(document.getElementById("phoneError") == null) {
						$("#phoneNumGroup").append(error);
						 $("#phoneNum").attr('placeholder',"请输入正确手机号");
						$("#phoneNum").addClass('warn');
						$("#phoneNum").focus();
						return false;
					}
					return false;
				}
				return false;
			}else {  
				$("#phoneError").remove();
			}
		
			if($("#getVerifyCode").attr("disabled") != 'disabled') {
				$("#getVerifyCode").attr("disabled", true);
				getVerifyCode();
			}
		});
		
		$("#signUpBtn").click(function() {
			if( ! $("#myform").valid() ) {
				return false;
			}
			
			if($("#age2").val()*1  != 0) {
				var birthYear = new Date().getFullYear()*1 - $("#age2").val()*1;
				$("#age").val(birthYear);
			}
			
			
			signUp();
		});
	});