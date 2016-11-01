	
function signIn() {
		$("#dataLoad").css({"display":"block"})
		var signInUrl = "doctor/signIn";
   		 $.ajax({ 
	  			url : signInUrl,
	  			type : 'post',
	  			cache : false,
	  			dataType : 'json',
			 	data : {
	     		      'patientNameOrPhoneNum' : $("#patientNameOrPhoneNum").val().trim(),
	     		     'passWord':$("#passWord").val()
	     	     },
	  			success : function(data) {
	  				console.log(data);
	  				$("#dataLoad").css({"display":"none"})
	  				if(data.result == 'success') {
	  					if($("#redictUrl").val() != "") {
  							 window.location.href=$("#redictUrl").val();   
	  					}else {
		  					$("#warn").text("");
		  					$("#singleBtnModalContent").text("绑定成功");
		  					$('#singleBtnModal').modal({backdrop: 'static', keyboard: false});
		  					$("#singleBtnModal").modal("show");
	  					}
	  				}else if("accountPasswdError" == data.result ) {
	  					$("#warn").text("账号密码错误");
	  				}else if('formatErr' == data.result) {
	  					$("#warn").text("手机号格式不正确");
	  				}else if('notExist' == data.result) {
	  					//$("#warn").text("账号不存在");
	  					$("#warn").text("");
	  					$("#2btnModalContent").text("您所绑定的账号不存在");
	  					$('#2btnModal').modal({backdrop: 'static', keyboard: false});
	  					$("#2btnModal").modal("show");
	  				}else if("openInWeixinPlease" == data.result) {
	  					$("#warn").text("");
	  					$("#singleBtnModalContent").text("请在微信中打开");
	  					$("#singleBtn").text("确定");
	  					$('#singleBtnModal').modal({backdrop: 'static', keyboard: false});
	  					$("#singleBtnModal").modal("show");
	  				}else if('waitAudit' == data.result) {
	  					//$("#warn").text("您的资料待审核中暂不支持绑定");
	  					$("#warn").text("");
	  					$("#singleBtnModalContent").text("您的资料待审核中暂不支持绑定");
	  					$("#singleBtn").text("确定");
	  					$('#singleBtnModal').modal({backdrop: 'static', keyboard: false});
	  					$("#singleBtnModal").modal("show");
	  					
	  				}else if('auditNoSuccess' == data.result) {
	  					//$("#warn").text("您的资料审核未通过,请补全");
	  					/*$("#warn").text("");
	  					$("#singleBtnModalContent").text("您的资料审核未通过,请补全");
	  					$("#singleBtn").text("补全资料");
	  					$('#singleBtnModal').modal({backdrop: 'static', keyboard: false});
	  					$("#singleBtnModal").modal("show");*/
	  					
	  					$("#auditNotSuccessContent").text("您的账号：【"+$("#patientNameOrPhoneNum").val()+"】审核未通过，如有问题，请联系客服400-888-3918");
	  					$("#auditNotSuccessBtn").text("确定");
	  					$('#auditNotSuccess').modal({backdrop: 'static', keyboard: false});
	  					$("#auditNotSuccess").modal("show");
	  					
	  				}else if('alreadyBind' == data.result) {
	  					//$("#warn").text("已绑定,请勿重复操作");
	  					$("#warn").text("");
	  					$("#singleBtnModalContent").text("已绑定,请勿重复操作");
	  					$("#singleBtn").text("确定");
	  					$('#singleBtnModal').modal({backdrop: 'static', keyboard: false});
	  					$("#singleBtnModal").modal("show");
	  				}else if('accountPasswdError' == data.result) {
	  					$("#warn").text("您输入的账号密码不正确");
	  				}else if('fail' == data.result) {
	  					$("#warn").text("失败,请重试");
	  				}else {
	  					$("#warn").text("失败,请重试");
	  				}
	  			},
	  			error : function(data) {
	  				$("#warn").text("失败,请重试");
	  				$("#dataLoad").css({"display":"none"})
	  			}
	  		});  
	}

	
function checkMobile(phoneNum) {
	if(!(/^1[3|4|5|7|8]\d{9}$/.test(phoneNum))){ 
        return false; 
    } 
	return true;
}
	function checkMobile2(phoneNum) {
		if(phoneNum == null || phoneNum == '' ||　phoneNum.length != 11){ 
	        return false; 
	    } 
		return true;
	}
	
    $(function () {
    	$("#auditNotSuccessBtn").text("确定").click(function() {
    		$("#auditNotSuccess").hide();
    		 WeixinJSBridge.call('closeWindow');
    	})
    	
    	
    	$("#2btnModal-leftBtn").text("注册").click(function() {
    		$("#2btnModal").hide();
    	    window.location.href="doctor/signUpPage?protocolConfirm=1&timestamp="+new Date().getTime();
    	})
    	$("#2btnModal-rightBtn").text("重试").click(function() {
    		$("#2btnModal").hide();
    		window.location.href="doctor/signInPage?timestamp="+new Date().getTime();
    	})
    	
    	$("#singleBtn").text("确定").click(function() {
    		$("#2btnModal").hide();
    		 WeixinJSBridge.call('closeWindow');
    	})
    	
    	
    	
    	
    /*	if(!is_weixn()) {
    		$("#body").css({"display":"none"})
    		$('#notOpenInWx').modal({backdrop: 'static', keyboard: false});
    		$("#notOpenInWx").modal("show");
    	}*/
    	$("#signIn").click(function() {
    		if($("#patientNameOrPhoneNum").val().trim() == '') {
    			$("#warn").text("请输入账号");
    			$("#patientNameOrPhoneNum").focus();
    			return;
    		}
    		/*if(! checkMobile2($("#patientNameOrPhoneNum").val())) {
    			$("#warn").text("请输入正确的手机号码");
    			$("#patientNameOrPhoneNum").focus();
    			return;
    		}*/
    		if($("#passWord").val().length <=0) {
    			$("#warn").text("请输入密码");
    			$("#passWord").focus();
    			return;
    		}
    		
    		signIn();
    	});
    	
    })