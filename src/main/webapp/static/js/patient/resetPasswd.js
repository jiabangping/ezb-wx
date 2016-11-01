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
		var getVerifyCodeUrl = "patient/getVerifyCodeForResetPasswd/"+$("#phoneNum").val().trim();
		$.ajax({
  			url : getVerifyCodeUrl,
  			type : 'get',
  			cache : false,
  			dataType : 'json',
  			success : function(data) {
  				if(data.result == 'success') {
  					$("#warn").text("验证码已下发到您的手机,请注意查收");//verifyCode="+data.verifyCode
  					return;
  				}else if("formatErr" == data.result) {
  					$("#warn").text("请输入正确手机号");
  					 $("#getVerifyCode").attr("disabled",false);
  					countdown=60;
  					clearTimeout(timeOut); 
  					return;
  				}else if("getVerifyCodeLimit" == data.result) {
  					$("#warn").text("");
  					$("#validVerifyCodeModalContent").text("该手机号码今天接收验证码数目已达上限");//这里用得是signUpPage内的signSuccessModal模态框不是公共的
					$('#validVerifyCodeModal').modal({backdrop: 'static', keyboard: false});
					$("#validVerifyCodeModal").modal("show");
  				}
  			},
  			error : function(data) {
  				$("#warn").text("验证用户名失败，请稍后再试。");
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
	
	
	//验证手机号是否已存在
	function verifyPhoneNumExist() {
		var phoneNum = $("#phoneNum").val().trim();
		var verifyPhoneNumExistUrl = "patient/existPhoneNum/"+phoneNum;
		 $.ajax({
  			url : verifyPhoneNumExistUrl,
  			type : 'get',
  			cache : false,
  			dataType : 'json',
  			success : function(data) {
  				if(data.result == 'notExist') {
  					$("#warn").text("不存在该手机号码");
  					 $("#getVerifyCode").attr("disabled",false);
  					return;
  				}else if("formatErr" == data.result) {
  					$("#warn").text("请输入正确手机号码");
 					 $("#getVerifyCode").attr("disabled",false);
 					countdown=60;
 					clearTimeout(timeOut); 
  					return;
  				}else {
  					getVerifyCode();
  				}
  			},
  			error : function(data) {
  				$("#warn").text("验证手机号失败，请稍后再试。");
  			}
  		});  
	}
	
	//提交数据注册,用户名,手机号,验证码,密码
	function signUp() {
		//$("#warn").text("验证中...");
		$("#dataSubmit").show();
		var token = $("#token").val();
		var signUpUrl = "patient/resetPasswd";
		 $.ajax({
	  			url : signUpUrl,
	  			type : 'post',
	  			cache : false,
	  			dataType : 'json',
  			 	data : {
	     		      'phoneNum' : $("#phoneNum").val().trim(),
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
	
	$(function() {
		$("#phoneNum").blur(function() {
			$("#myForm").valid();
		});
		$("#verifyCode").blur(function() {
			$("#myForm").valid();
		});
		$("#passWord").blur(function() {
			$("#myForm").valid();
		});
		$("#passWordConfirm").blur(function() {
			$("#myForm").valid();
		});
		
		$("#validVerifyCodeModalBtn").text("确定").click(function() {
			$("#validVerifyCodeModal").modal("hide");
		})
		
		
		$("#singleBtn").text("确定").click(function() {
			$("#singleBtnModal").modal("hide");
   		 	WeixinJSBridge.call('closeWindow');
		});
		
		//获取验证码
		$("#getVerifyCode").click(function() {
			/*if($("#phoneNum").val().trim() == '' || $("#phoneNum").val().trim().length != 11) {
				 $("#phoneNum").attr('placeholder',"请输入正确手机号");
				$("#phoneNum").addClass('warn');
				$("#phoneNum").focus();
				$("#warn").text("请输入正确手机号");
				return;
			}*/
			
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
				$("#warn").text("获取中...");
				verifyPhoneNumExist();
			}
		});
		
		$("#signUpBtn").click(function() {
			if( ! $("#myForm").valid() ) {
				return false;
			}
			/*if($("#patientName").val() == '') {
				 $("#patientName").attr('placeholder',"请输入用户名");
				$("#patientName").addClass('warn');
				$("#patientName").focus();
				$("#warn").text("请输入用户名");
				return;
			}
			//verifyPatientNameExist();
			
			if($("#phoneNum").val() == '') {
				 $("#phoneNum").attr('placeholder',"请输入手机号");
				$("#phoneNum").addClass('warn');
				$("#phoneNum").focus();
				$("#warn").text("请输入手机号码");
				return;
			}
			if(!checkMobile ($("#phoneNum").val().trim())) { 
    			$("#warn").text("请输入正确的手机号码");
    			$("#phoneNum").focus();
    			return;
    		}
			
			
			if($("#verifyCode").val() == '') {
				 $("#verifyCode").attr('placeholder',"请输入验证码");
				$("#verifyCode").addClass('warn');
				$("#verifyCode").focus();
				$("#warn").text("请输入验证码");
				return;
			}
			
			if($("#verifyCode").val().trim().length != 6) {
				 $("#verifyCode").attr('placeholder',"请输入6位验证码");
				$("#verifyCode").addClass('warn');
				$("#verifyCode").focus();
				$("#warn").text("请输入6位验证码");
				return;
			}
			
			if($("#passWord").val() == '') {
				 $("#passWord").attr('placeholder',"请输入新密码");
				$("#passWord").addClass('warn');
				$("#passWord").focus();
				$("#warn").text("请输入新密码");
				return;
			}
			if($("#passWord").val().length < 6 ||$("#passWord").val().length > 15) {
				 $("#passWord").attr('placeholder',"请输入6-15位新密码");
				$("#passWord").addClass('warn');
				$("#passWord").focus();
				$("#warn").text("请输入6-15位新密码");
				return;
			}
			
			
			if($("#passWordConfirm").val() == '') {
				 $("#passWordConfirm").attr('placeholder',"请输入确认密码");
				$("#passWordConfirm").addClass('warn');
				$("#passWordConfirm").focus();
				$("#warn").text("请输入确认密码");
				return;
			}
			if($("#passWordConfirm").val().length < 6 ||$("#passWordConfirm").val().length > 15) {
				 $("#passWordConfirm").attr('placeholder',"请输入6-15位确认密码");
				$("#passWordConfirm").addClass('warn');
				$("#passWordConfirm").focus();
				$("#warn").text("请输入6-15位确认密码");
				return;
			}
			
			
			if($("#passWord").val() != $("#passWordConfirm").val()) {
				$("#warn").text("确认密码不一致，请重新输入");
				$("#passWordConfirm").focus();
				return;
			}*/
			$("#warn").text("验证中...");
			signUp();
		});
	});