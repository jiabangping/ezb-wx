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
		var getVerifyCodeUrl = "doctor/getVerifyCodeForResetPasswd/"+$("#phoneNum").val().trim();
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
	
	
	//验证手机号是否已存在
	function verifyPhoneNumExist() {
		var phoneNum = $("#phoneNum").val().trim();
		var verifyPhoneNumExistUrl = "doctor/existPhoneNumForResetPasswd/"+phoneNum;
		 $.ajax({
  			url : verifyPhoneNumExistUrl,
  			type : 'get',
  			cache : false,
  			dataType : 'json',
  			success : function(data) {
  				if("formatErr" == data.result) {
  					$("#warn").text("请输入正确手机号码");
 					 $("#getVerifyCode").attr("disabled",false);
 					countdown=60;
 					clearTimeout(timeOut); 
  					return;
  				}else if("notExist" == data.result ) {
  					//$("#warn").text("您的账户不存或未成为正式用户，暂不支持此操作");
  					$("#warn").text("");
  					$("#validVerifyCodeModalContent").text("您的账户不存或未成为正式用户，暂不支持此操作");//这里用得是signUpPage内的signSuccessModal模态框不是公共的
					$('#validVerifyCodeModal').modal({backdrop: 'static', keyboard: false});
					$("#validVerifyCodeModal").modal("show");
  				}else if(data.result == 'exist') {
  					getVerifyCode();
  				}
  			},
  			error : function(data) {
  				$("#warn").text("验证手机号失败，请稍后再试。");
  			}
  		});  
	}
	
	
	function signUp() {//手机用户修改密码
		//$("#warn").text("验证中...");
		$("#dataSubmit").show();
		var token = $("#token").val();
		var signUpUrl = "doctor/resetPasswd";
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
	
	
	
	
	function passwdModifyByEmail() {//邮箱用户修改密码
		$("#dataSubmit").show();
		var token = $("#token").val();
		//var modifyPasswdByEmailUrl = "doctor/resetPasswdByEmail";
		var url = "doctor/existEmail;jsessionid=73E6B2470C91A433A6698C7681FD44F4";
		 $.ajax({
	  			url : url,
	  			type : 'get',
	  			cache : false,
	  			dataType : 'json',
	  			data:{
	  				"email":$("#phoneNum").val().trim(),
	  				"token":$("#token").val()
	  			},
	  			success : function(data) {
	  				$("#dataSubmit").hide();
	  				if(data.result == 'exist') {
	  					$("#warn").text("");
	  					$("#singleBtnModalContent").text("已将重置密码链接下发到您的邮箱请在30分钟内修改");
  						$('#singleBtnModal').modal({backdrop: 'static', keyboard: false});
  						$("#singleBtnModal").modal("show");
	  					//showMaskAlert();
	  				}else if(data.result == 'notExist') {
	  					$("#warn").text("");
	  					$("#validVerifyCodeModalContent").text("您的账户不存或未成为正式用户，暂不支持此操作");//这里用得是signUpPage内的signSuccessModal模态框不是公共的
						$('#validVerifyCodeModal').modal({backdrop: 'static', keyboard: false});
						$("#validVerifyCodeModal").modal("show");
	  				}else if(data.result == 'fail') {
	  					$("#warn").text("失败，请重试");
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
	
	//邮箱用户重置密码获取验证码
	function getEmailVerifyCode() {
		settime();
		var getEmailVerifyCodeUrl = "doctor/getEmailVerifyCodeForModifyPasswd";
		$.ajax({
  			url : getEmailVerifyCodeUrl,
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
	
	function initGetVerifyCode() {
		$("#getVerifyCode").click(function() {
			var overSea = $("input:radio[name='Oversea']:checked").val();
			if(overSea *1 == 0) {
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
			}else {
				if(!isEmail( $("#phoneNum").val().trim())) {
					if(document.getElementById("phoneError") == null) {
					 $("#phoneNum").attr('placeholder',"请输入正确的邮箱");
					//	$("#phoneNum").addClass('warn');
					$("#phoneNum").focus();
					//$("#warn").text("请输入正确的邮箱");
					 var error =  "<label class='error' id='phoneError' generated='true' for='phoneNum'>请输入正确的邮箱</label>";
					 $("#phoneNumGroup").append(error);
					 return false;
					}
					return false;
				}else {
					$("#phoneError").remove();
				}
				if($("#getVerifyCode").attr("disabled") != 'disabled') {
					$("#getVerifyCode").attr("disabled", true);
					$("#warn").text("获取中...");
				//	verifyPhoneNumExist();
					getEmailVerifyCode();
				}
			}
			
		});
	}
	
	
	$(function() {
		
		$('#addrRadioGroup input').on('ifChecked', function(event){
			//console.log(event.target.value)
			if(event.target.value == 1) {//海外
				var userInfo = 
				"<div id='userInfo'>"+
			        "<div class='form-group ' id='phoneNumGroup' >"+
			          "<label class='control-label' style='padding-top:0' for='inputError1'>邮箱</label>"+
			           "<input type='email' placeholder='请输入邮箱'  class='form-control {required:true,email:true}' id='phoneNum' name='phoneNum'>"+
			        "</div>"+
		        "</div>"; 
				$("#userInfo").replaceWith(userInfo);
				//$("#passwdGroup").css({"display":"none"})
				$("#passwdGroup").replaceWith("<input type='hidden' id='passwdGroup' >");
				$("#phoneNum").blur(function() {
					$("#myForm").valid();
				})
			}else {//国内
				//$("#passwdGroup").css({"display":"block"})
				var passwdGroup = 
				"<div id='passwdGroup'>"+
					"<div class='form-group '>"+
					  "<label class='control-label' style='padding-top:0;padding-bottom:3px;' for='inputError1'>新密码</label>"+
					   "<input type='password' placeholder='请输入6-15位新密码'  class='form-control {required:true,passwd:true}' id='passWord' name='passWord'>"+
					"</div>"+
		
				   "<div class='form-group '>"+
					  "<label class='control-label' style='padding-top:0;padding-bottom:3px;' for='inputError1'>密码确认</label>"+
					   "<input type='password' placeholder='请输入确认密码'  class='form-control {required:true,passwd:true}' id='passWordConfirm' name='passWordConfirm'>"+
				    "</div>"+
				"</div>";
				$("#passwdGroup").replaceWith(passwdGroup);
				
				var userInfo = 
					"<div id='userInfo'>"+
			        "<div class='form-group '>"+
			          "<label class='control-label' for='inputError1' style='padding-top:0'>手机号码</label>"+
			           "<input type='tel' placeholder='请输入手机号码'  class='form-control {required:true,mobile:true}' id='phoneNum' name='phoneNum'>"+
			        "</div>"+
			        "<div id='' class='row' style='margin-bottom:15px;'>"+
						"<label class='control-label' style='margin-left:15px;padding-top:0' for='inputError1'>验证码</label>"+
			       		"<div>"+
			            	"<div class='col-xs-8' style='padding-right:10px;'>"+
			               		"<input placeholder='请输入验证码' type='number' class='form-control {required:true,verifyCode:true}' id='verifyCode' name='verifyCode'>"+
			            	"</div>"+
			            	"<div class='col-xs-4' style='padding-left:0;'>"+
			               	 	"<a id='getVerifyCode' class='form-control btn-primary' style='text-decoration: none;text-align:center;font-size: 12px;padding-left:0;padding-right:0;margin-left:0;margin-right:0;background:#00abec;border: none;outline: none;cursor: pointer;padding-top:9px;color: white;text-shadow:none'>获取验证码</a>"+
			           		"</div>"+
			   		 	"</div>"+
			   		"</div>"+
				"</div>"; 
				$("#userInfo").replaceWith(userInfo);
			}
			initGetVerifyCode();
			$("#myForm").valid();
			$("#phoneNum").blur(function() {
				$("#myForm").valid();
			})
			$("#verifyCode").blur(function() {
				$("#myForm").valid();
			});
			$("#passWord").blur(function() {
				$("#myForm").valid();
			});
			$("#passWordConfirm").blur(function() {
				$("#myForm").valid();
			});
		}).iCheck({
			  checkboxClass: 'icheckbox_square-blue',
			  radioClass: 'iradio_square-blue',
			  increaseArea: '20%'
		});
		
		
		$("#validVerifyCodeModalBtn").text("确定").click(function() {
			$("#validVerifyCodeModal").modal("hide");
			WeixinJSBridge.call('closeWindow');
		})
		
		
		$("#singleBtn").text("确定").click(function() {
			$("#singleBtnModal").modal("hide");
   		 	WeixinJSBridge.call('closeWindow');
		});
		
		/*$("#patientName").blur(function() {
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
		});*/
		
		//获取验证码
		initGetVerifyCode();
		
		$("#signUpBtn").click(function() {
			
		var overSea = $("input:radio[name='Oversea']:checked").val();
		if(overSea *1 == 0) {
			if( ! $("#myForm").valid() ) {
				return false;
			}
			
			/*if($("#phoneNum").val() == '') {
				 $("#phoneNum").attr('placeholder',"请输入手机号");
				$("#phoneNum").addClass('warn');
				$("#warn").text("请输入手机号码");
				$("#phoneNum").focus();
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
		}else {
			/*if($("#phoneNum").val() == '') {
				 $("#phoneNum").attr('placeholder',"请输入邮箱");
				$("#phoneNum").addClass('warn');
				$("#phoneNum").focus();
				$("#warn").text("请输入邮箱");
				return;
			}
			if(!isEmail( $("#phoneNum").val().trim() )) {
				$("#warn").text("请输入正确的邮箱");
				$("#phoneNum").focus();
				return;
			}*/
			
			if( ! $("#myForm").valid() ) {
				$("#phoneNum").focus();
				return false;
			}
	
		}
			$("#warn").text("验证中...");
			
			if(overSea *1 == 0) {
				signUp();//手机用户修改密码
			}else {
				passwdModifyByEmail();
			}
		});
	});