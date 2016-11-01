var phoneNumExist = true;
	var countdown=60;
	var timeOut;
	function settime() {
		if (countdown == 0) {
	            $("#getVerifyCode").attr("disabled",false);
	          	$("#getVerifyCode").text("免费获取验证码");
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
	
	/*function hideMaskAlert() {
	    $("#maskAlert").hide();
	    window.location.href="patient/signInPage";
	}
	function showMaskAlert() {
		$("#alertContent").text("注册成功跳转到登录页面");
		$("#maskAlert").fadeIn("slow");
		$("#maskAlert").show();
		setTimeout(hideMaskAlert, 1500);
	}*/
	
	//获取验证码
	function getVerifyCode() {
		settime();
		var getVerifyCodeUrl = "doctor/getEmailVerifyCodeForModifyPasswd";
		$.ajax({
  			url : getVerifyCodeUrl,
  			type : 'get',
  			cache : false,
  			dataType : 'json',
  			data: {
  				"email":$("#phoneNum").val().trim()
  			},
  			success : function(data) {
  				if(data.result == 'success') {
  					$("#warn").text("验证码已下发到您的邮箱,请注意查收");//verifyCode="+data.verifyCode
  					return;
  				}else if("formatErr" == data.result) {
  					$("#warn").text("请输入正确邮箱");
  					 $("#getVerifyCode").attr("disabled",false);
  					countdown=60;
  					clearTimeout(timeOut); 
  					return;
  				}else if("verifyError" == data.result) {
  					$("#warn").text("验证码错误");
  				}else if("getVerifyCodeLimit" == data.result) {
  					$("#warn").text("");
  					$("#validVerifyCodeModalContent").text("该手机号码今天接收验证码数目已达上限");//这里用得是signUpPage内的signSuccessModal模态框不是公共的
					$('#validVerifyCodeModal').modal({backdrop: 'static', keyboard: false});
					$("#validVerifyCodeModal").modal("show");
  				}else if("notExist" == data.result ) {
  					$("#warn").text("");
  					$("#validVerifyCodeModalContent").text("您的账户不存或未成为正式用户，暂不支持此操作");//这里用得是signUpPage内的signSuccessModal模态框不是公共的
					$('#validVerifyCodeModal').modal({backdrop: 'static', keyboard: false});
					$("#validVerifyCodeModal").modal("show");
  				}
  			},
  			error : function(data) {
  				$("#warn").text("验证用户名失败，请稍后再试。");
  			}
  		});  
	}
	
	
	//验证邮箱是否已存在
	function verifyPhoneNumExist() {
		var phoneNum = $("#phoneNum").val().trim();
		var verifyPhoneNumExistUrl = "doctor/existEmail/"+phoneNum;
		 $.ajax({
  			url : verifyPhoneNumExistUrl,
  			type : 'get',
  			cache : false,
  			dataType : 'json',
  			success : function(data) {
  				if(data.result != 'exist') {
  					$("#warn").text("系统不存在该邮箱,或您未成为正式用户,暂不支持此操作");
  					return;
  				}else if("formatErr" == data.result) {
  					$("#warn").text("请输入正确手机号码");
 					 $("#getVerifyCode").attr("disabled",false);
 					countdown=60;
 					clearTimeout(timeOut); 
  					return;
  				}else if("notExist" == data.result ) {
  					$("#warn").text("您的账户不存或未成为正式用户，暂不支持此操作");

  					/*$("#validVerifyCodeModalContent").text("您的账户不存或未成为正式用户，暂不支持此操作");//
					$('#validVerifyCodeModal').modal({backdrop: 'static', keyboard: false});
					$("#validVerifyCodeModal").modal("show");*/
  				}else if(data.result == 'exist') {
  					getVerifyCode();
  				}
  			},
  			error : function(data) {
  				$("#warn").text("验证手机号失败，请稍后再试。");
  			}
  		});  
	}
	
	//提交数据注册,用户名,手机号,验证码,密码
	function passwdModifyByEmail() {
		//$("#warn").text("验证中...");
		$("#dataSubmit").show();
		var token = $("#token").val();
		var signUpUrl = "doctor/resetPasswdByEmailCode";
		 $.ajax({
	  			url : signUpUrl,
	  			type : 'post',
	  			cache : false,
	  			dataType : 'json',
  			 	data : {
	     		      'email' : $("#phoneNum").val().trim(),
	     		      'verifyCode' : $("#verifyCode").val().trim(),
	     		      'passWord' : $("#passWord").val().trim(),
	     		      'passWordConfirm' : $("#passWordConfirm").val().trim(),
	     		      'token':token
	     	     },
	  			success : function(data) {
	  				$("#dataSubmit").hide();
	  				if(data.result == 'success') {
	  					$("#warn").text("");
	  					$("#singleBtnModalContent").text("修改成功");
  						$('#singleBtnModal').modal({backdrop: 'static', keyboard: false});
  						$("#singleBtnModal").modal("show");
	  					//showMaskAlert();
	  				}else if(data.result == 'notExist') {
	  					$("#warn").text("用户不存在");
	  					//$("#2btnModalContent").text("该用户已存在");
	  				}else if(data.result == 'fail') {
	  					$("#warn").text("修改失败");
	  				}else if(data.result == 'verifyError') {
	  					$("#warn").text("验证码错误");
	  				}else if(data.result == 'tokenInvalid') {
	  					$("#warn").text("");
	  					$("#singleBtnModalContent").text("请勿重复提交");
  						$('#singleBtnModal').modal({backdrop: 'static', keyboard: false});
  						$("#singleBtnModal").modal("show");
	  				}else if("confirmPasswdError" == data.result) {
	  					$("#warn").text("确认密码错误");
	  				}else if("notExist" == data.result ) {
	  					$("#warn").text("");
	  					$("#validVerifyCodeModalContent").text("您的账户不存或未成为正式用户，暂不支持此操作");//这里用得是signUpPage内的signSuccessModal模态框不是公共的
						$('#validVerifyCodeModal').modal({backdrop: 'static', keyboard: false});
						$("#validVerifyCodeModal").modal("show");
	  				}
	  			},
	  			error : function(data) {
	  				$("#dataSubmit").hide();
	  				$("#warn").text("修改失败");
	  			}
	  		});  
	}
	function checkMobile(phoneNum) {
		if(!(/^1[3|4|5|7|8]\d{9}$/.test(phoneNum))){ 
	        return false; 
	    } 
		return true;
	}
	function checkEmail() {
		var emailValue=document. getElementById_r("email").value;
		if (!isEmail(emailValue)) {
			alert("您输入的邮箱有误,请重新核对后再输入!");
			document. getElementById_r("email").focus();
			return false;
		}
		return true;
	}
	function isEmail(str){
		var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
	 	return reg.test(str);
	}
	
	
	$(function() {
		
		$("#validVerifyCodeModalBtn").text("确定").click(function() {
			$("#validVerifyCodeModal").modal("hide");
			WeixinJSBridge.call('closeWindow');
		})
		if($("#flag").val() != "" && "notExist" == $("#flag").val()) {
			$("#validVerifyCodeModalContent").text("您的账号不存在或者审核未通过，暂不支持此操作");//这里用得是signUpPage内的signSuccessModal模态框不是公共的
			$('#validVerifyCodeModal').modal({backdrop: 'static', keyboard: false});
			$("#validVerifyCodeModal").modal("show");
		}else if($("#flag").val() != "" && "openInWeixinPlease" == $("#flag").val()) {
			$("#validVerifyCodeModalContent").text("请在微信中打开");//这里用得是signUpPage内的signSuccessModal模态框不是公共的
			$('#validVerifyCodeModal').modal({backdrop: 'static', keyboard: false});
			$("#validVerifyCodeModal").modal("show");
		}
		
		
		$("#singleBtn").text("确定").click(function() {
			$("#singleBtnModal").modal("hide");
   		 	WeixinJSBridge.call('closeWindow');
		});
		
		$("#patientName").blur(function() {
			if($("#patientName").val() != '') {
				$("#patientName").removeClass('warn');
			}
		});
		$("#phoneNum").blur(function() {
			if($("#phoneNum").val() != '') {
				$("#phoneNum").removeClass('warn');
			}
		});
		$("#verifyCode").blur(function() {
			if($("#verifyCode").val() != '') {
				$("#verifyCode").removeClass('warn');
			}
		});
		$("#passWord").blur(function() {
			if($("#passWord").val() != '') {
				$("#passWord").removeClass('warn');
			}
		});
		
		//获取验证码
		$("#getVerifyCode").click(function() {
			if(!isEmail( $("#phoneNum").val().trim())) {
				 $("#phoneNum").attr('placeholder',"请输入正确的邮箱");
				$("#phoneNum").addClass('warn');
				$("#warn").text("请输入正确的邮箱");
				return;
			}
			if($("#getVerifyCode").attr("disabled") != 'disabled') {
				$("#getVerifyCode").attr("disabled", true);
				$("#warn").text("获取中...");
			//	verifyPhoneNumExist();
				getVerifyCode();
			}
		});
		
		$("#signUpBtn").click(function() {
			if($("#patientName").val() == '') {
				 $("#patientName").attr('placeholder',"请输入用户名");
				$("#patientName").addClass('warn');
				$("#warn").text("请输入用户名");
				return;
			}
		
			
			if($("#phoneNum").val() == '') {
				 $("#phoneNum").attr('placeholder',"请输入邮箱");
				$("#phoneNum").addClass('warn');
				$("#warn").text("请输入邮箱");
				return;
			}
			/*if(!checkMobile ($("#phoneNum").val().trim())) { 
    			$("#warn").text("请输入正确的手机号码");
    			return;
    		}*/
			if(!isEmail( $("#phoneNum").val().trim() )) {
				$("#warn").text("请输入正确的邮箱");
    			return;
			}
			
			
			if($("#verifyCode").val() == '') {
				 $("#verifyCode").attr('placeholder',"请输入验证码");
				$("#verifyCode").addClass('warn');
				$("#warn").text("请输入验证码");
				return;
			}
			
			if($("#verifyCode").val().trim().length != 6) {
				 $("#verifyCode").attr('placeholder',"请输入6位验证码");
				$("#verifyCode").addClass('warn');
				$("#warn").text("请输入6位验证码");
				return;
			}
			
			if($("#passWord").val() == '') {
				 $("#passWord").attr('placeholder',"请输入新密码");
				$("#passWord").addClass('warn');
				$("#warn").text("请输入新密码");
				return;
			}
			if($("#passWord").val().length < 6 ||$("#passWord").val().length > 15) {
				 $("#passWord").attr('placeholder',"请输入6-15位新密码");
				$("#passWord").addClass('warn');
				$("#warn").text("请输入6-15位新密码");
				return;
			}
			
			
			if($("#passWordConfirm").val() == '') {
				 $("#passWordConfirm").attr('placeholder',"请输入确认密码");
				$("#passWordConfirm").addClass('warn');
				$("#warn").text("请输入确认密码");
				return;
			}
			if($("#passWordConfirm").val().length < 6 ||$("#passWordConfirm").val().length > 15) {
				 $("#passWordConfirm").attr('placeholder',"请输入6-15位确认密码");
				$("#passWordConfirm").addClass('warn');
				$("#warn").text("请输入6-15位确认密码");
				return;
			}
			
			
			if($("#passWord").val() != $("#passWordConfirm").val()) {
				$("#warn").text("确认密码不一致，请重新输入");
				return;
			}
			$("#warn").text("验证中...");
			passwdModifyByEmail();
		});
		
		
		
	});