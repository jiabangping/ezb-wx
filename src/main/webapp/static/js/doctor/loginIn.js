	function hideMaskAlert() {
	    $("#maskAlert").hide();
	   // window.location.href="doctor/doctorsPage";
	    window.location.href="sms/smsPage";
	}
	function showMaskAlert() {
		$("#alertContent").text("登录成功跳转中");
		$("#maskAlert").fadeIn("slow");
		$("#maskAlert").show();
		setTimeout(hideMaskAlert, 1500);
	}

	function signIn() {
		$("#signIning").show();
		var signInUrl = "doctor/loginIn";
   		 $.ajax({ 
	  			url : signInUrl,
	  			type : 'post',
	  			cache : false,
	  			dataType : 'json',
			 	data : {
     		      'phoneNumOrEmail' : $("#phoneNumOrEmail").val().trim(),
 		     	  'passWord' : $("#passWord").val().trim()
	     	    },
	  			success : function(data) {
	  				$("#signIning").hide();
	  				if(data.result == 'success') {
	  					console.log(data);
	  					//window.location.href="<%=basePath %>/doctor/doctorPage";
	  					window.location.href=$("#redirectUrl").val()+"?token="+data.doctorToken+"&doctorId="+data.id;
	  				}else if("accountPasswdError" == data.result) {
	  					$("#warn").text("账号密码不正确");
	  				}else if("openInWeixinPlease" == data.result) {
	  					$("#warn").text("请在微信中打开");
	  				}else {
	  					$("#warn").text("账号密码不正确");
	  				}
	  			},
	  			error : function(data) {
	  				$("#signIning").hide();
	  				$("#warn").text("登录失败");
	  			}
	  		});  
	}

	function checkMobile(phoneNum) {
		if(!(/^1[3|4|5|7|8]\d{9}$/.test(phoneNum))){ 
	        return false; 
	    } 
		return true;
	}
	
    $(function () {
    	$("#signIn").click(function() {
    		if($("#phoneNumOrEmail").val().trim() == '') {
    			$("#phoneNumOrEmail").focus();
    			$("#warn").text("请输入手机号码/邮箱");
    			return;
    		}
    		
    		if($("#passWord").val().trim() == '') {
    			$("#passWord").focus();
    			$("#warn").text("请输入密码");
    			return;
    		}
    		$("#warn").text("账号密码校验中");
    		signIn();
    	});
    	
    })