function checkMobile(phoneNum) {
	if(!(/^1[3|4|5|7|8]\d{9}$/.test(phoneNum))){ 
        return false; 
    } 
	return true;
}
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

//验证手机号是否已存在
function verifyPhoneNumExist() {
	var phoneNum = $("#PhoneNum").val().trim();
	var verifyPhoneNumExistUrl = "doctor/existPhoneNum/"+phoneNum;
//alert("verifyPhoneNumExistUrl="+verifyPhoneNumExistUrl);
	 $.ajax({
		url : verifyPhoneNumExistUrl,
		type : 'get',
		cache : false,
		data:{"signUpAgain":$("#signUpAgain").val()
			},
		dataType : 'json',
		success : function(data) {
			 $("#getVerifyCode").attr("disabled",false);
			if(data.result == 'onlyFinishFirstStep') {
				$("#firstOverSea").val(data.firstOverSea);
				$("#firstWhich").val(data.firstWhich);
				$("#firstDoctorName").val(data.firstDoctorName);
				
				$("#onlyFinishFirstStepModalContent").text(data.msg);
				$('#onlyFinishFirstStepModal').modal({backdrop: 'static', keyboard: false});
				$("#onlyFinishFirstStepModal").modal("show");
				
			}else if(data.result == 'waitForValidEmail') {
				
				$("#waitForValidEmailContent").text(data.msg);
				$('#waitForValidEmail').modal({backdrop: 'static', keyboard: false});
				$("#waitForValidEmail").modal("show");
				
			}else if(data.result == 'waitAudit') {
				$("#waitAuditModalContent").text(data.msg);
				$('#waitAuditModal').modal({backdrop: 'static', keyboard: false});
				$("#waitAuditModal").modal("show");
			}else if(data.result == 'auditNoSuccess') {
				
				/*$("#auditNoSuccessModalContent").text(data.msg);
				$('#auditNoSuccessModal').modal({backdrop: 'static', keyboard: false});
				$("#auditNoSuccessModal").modal("show");*/
				$("#auditFailModalContent").text(data.msg);
				$('#auditFailModal').modal({backdrop: 'static', keyboard: false});
				$("#auditFailModal").modal("show");
				
			}else if(data.result == 'alreadyBind') {
				$("#signSuccessBtn").text("确定");
				$("#signSuccessModalContent").text("您的账号已经绑定，请勿重复操作");
				$('#signSuccessModal').modal({backdrop: 'static', keyboard: false});
				$("#signSuccessModal").modal("show");
				
			}else if(data.result == 'existBindPlease') {
				
				$("#existBindPleaseModelContent").text("您的账号已存在，请绑定");
				$('#existBindPleaseModel').modal({backdrop: 'static', keyboard: false});
				$("#existBindPleaseModel").modal("show");
			}else if('openInWeixinPlease' == data.result) {
				$("#singleBtnModalContent").text("请在微信中打开");
				$("#singleBtn").text("确定");
				 $("#getVerifyCode").attr("disabled",false);
				$('#singleBtnModal').modal({backdrop: 'static', keyboard: false});
				$("#singleBtnModal").modal("show");
			}else if(data.result == 'exist') {
				//$("#alertContent").text("该手机号码已存在");
				//showMaskAlert();
				$("#singleBtnModalContent").text("该手机号码已存在");
				$("#singleBtn").text("确定");
				 $("#getVerifyCode").attr("disabled",false);
				$('#singleBtnModal').modal({backdrop: 'static', keyboard: false});
				$("#singleBtnModal").modal("show");
				
				 $("#getVerifyCode").attr("disabled",false);
				 countdown=60;
				 clearTimeout(timeOut); 
				return;
			}else if("formatErr" == data.result) {
				/*$("#alertContent").text("请输入正确手机号码");
				showMaskAlert();*/
				showUploadResult('请输入正确手机号码');
				 $("#getVerifyCode").attr("disabled",false);
				countdown=60;
				clearTimeout(timeOut); 
				return;
			}else if("notExist" == data.result){
				getVerifyCode();
			}
		},
		error : function(data) {
			$("#warn").text("验证手机号失败，请稍后再试。");
			 $("#getVerifyCode").attr("disabled",false);
		}
	});  
}

//获取验证码
function getVerifyCode() {
	settime();
	//alert("已下发验证码,注意查收");
	var getVerifyCodeUrl = "doctor/getVerifyCode/"+$("#PhoneNum").val().trim();
	$.ajax({
			url : getVerifyCodeUrl,
			type : 'get',
			cache : false,
			data:{
				"signUpAgain":$("#signUpAgain").val()
			},
			dataType : 'json',
			success : function(data) {
				if(data.result == 'success') {
				//	settime(); 
				//	alert("成功下发验证码,verifyCode="+data.verifyCode);
					 $("#getVerifyCode").attr("disabled",false);
					$("#warn").text("验证码已下发到您的手机,请注意查收");//verifyCode="+data.verifyCode
					return;
				}else if("formatErr" == data.result) {
					$("#warn").text("请输入正确手机号码");
					 $("#getVerifyCode").attr("disabled",false);
					countdown=60;
					clearTimeout(timeOut); 
					
					return;
				}else if("getVerifyCodeLimit" == data.result){//该手机号码今天接收验证码数目已达上限
					$("#singleBtnModalContent").text("该手机号码今天接收验证码数目已达上限");//这里用得是signUpPage内的signSuccessModal模态框不是公共的
					$('#singleBtnModal').modal({backdrop: 'static', keyboard: false});
					$("#singleBtnModal").modal("show");
				}
			},
			error : function(data) {
				 $("#getVerifyCode").attr("disabled",false);
				$("#warn").text("验证用户名失败，请稍后再试。");
			}
		});  
}


function hideMaskAlert() {
	$("#maskAlert").hide();
}
function showMaskAlert() {
	$("#maskAlert").fadeIn("slow");
		$("#maskAlert").show();
		setTimeout(hideMaskAlert, 2000);
}
//第一次提交
function firstSubmit() {
	var firstSubUrl = "doctor/signUpFirstSubData";
	var overSeaVal = $('input:radio[name=Oversea]:checked').val();//0 国内，1:海外
	var s = $('input:radio[name=Sex]:checked').val();
	$("#firstOverSea").val( $('input:radio[name=Oversea]:checked').val())
	if(overSeaVal *1 == 0 ) {//国内
		$("#firstWhich").val($("#PhoneNum").val());
		$.ajax({
			url : firstSubUrl,
			type : 'post',
			cache : false,
			dataType : 'json',
	    	 data : {
		      'oversea' : $('input:radio[name=Oversea]:checked').val(),
		      'sex' : $('input:radio[name=Sex]:checked').val(),
		      'doctorName' : $("#DoctorName").val(),
		      'phoneNum':$("#PhoneNum").val(),
		      'verifyCode':$("#verifyCode").val(),
		      'idCard':$("#IDCard").val(),
		      "signUpAgain":$("#signUpAgain").val()
		     },
			success : function(data) {
				$("#dataLoad").hide();
				if(data.result == 'success') {
					$("#first").hide();
					$("#userName").text($("#DoctorName").val());
					$("#second").show();
					firstSubmitSuccessSetCookie();
				}else if(data.result == 'verifyError') {
					showUploadResult('验证码错误');
				}else if("openInWeixinPlease" == data.result) {
					showUploadResult('请在微信中打开');
				}else if(data.result == 'exist') {
					showUploadResult('手机号已存在');
				}else if(data.result == 'fail') {
					showUploadResult('失败,请重试');
				}else if(data.result == 'lackRequiredField') {
					showUploadResult('缺少必填字段,请重试');
	 			}else {
				}
			},
			error : function(data) {
			}
		});  
	}else if(overSeaVal *1 == 1) {//海外
		$("#firstWhich").val($("#overseaEmail").val());
		var chargingStandardValue = $("#chargingStandard2").val();
		var chargingStandard = '';
		if(chargingStandardValue != undefined) {
			chargingStandard = $("#chargingStandard2").val().trim();
		}
		$.ajax({
			url : firstSubUrl,
			type : 'post',
			cache : false,
			dataType : 'json',
	    	 data : {
		      'oversea' : $('input:radio[name=Oversea]:checked').val(),
		      'sex' : $('input:radio[name=Sex]:checked').val(),
		      'doctorName' : $("#DoctorName").val(),
		      'phoneNum':$("#PhoneNum").val(),
		      'idCard':$("#IDCard").val(),
		      'chargingStandard':chargingStandard,
		      'email':$("#overseaEmail").val(),
		      'signUpAgain':$("#signUpAgain").val()
		     },
			success : function(data) {
				$("#dataLoad").hide();
				if(data.result == 'onlyFinishFirstStep') {
					$("#firstOverSea").val(data.firstOverSea);
					$("#firstWhich").val(data.firstWhich);
					$("#firstDoctorName").val(data.firstDoctorName);
					
					$("#onlyFinishFirstStepModalContent").text(data.msg);
					$('#onlyFinishFirstStepModal').modal({backdrop: 'static', keyboard: false});
					$("#onlyFinishFirstStepModal").modal("show");
				}else if(data.result == "overSeaPhoneNumExist") {
					var statusContent = "";
					if(data.accountStatus == 1) {
						statusContent = "待补全资料";
					}else if(data.accountStatus == 2) {
						statusContent = "待验证邮箱";
					}else if(data.accountStatus == 3) {
						statusContent = "待审核";
					}else if(data.accountStatus == 4){
						statusContent = "审核未通过";
					}else if(data.accountStatus == 5) {
						statusContent = "审核通过";
					}else {
						statusContent = "其他";
					}
					var _email = data.email;
					if(_email == undefined || _email== null || _email == '') {
						_email = "空";
					}
					
					var textContent = "您输入的手机号码【"+$("#PhoneNum").val()+"】已存在,关联邮箱为【"+_email+"】,当前为【"+statusContent+"】状态";
					//$("#singleBtnModalContent").text("您输入的手机号码【"+$("#PhoneNum").val()+"】已存在");
					$("#singleBtnModalContent").text(textContent);
					$("#singleBtn").text("确定");
					$('#singleBtnModal').modal({backdrop: 'static', keyboard: false});
					$("#singleBtnModal").modal("show");
				}else if(data.result == 'waitForValidEmail') {
					$("#which").val(data.which);
					$("#waitForValidEmailContent").text(data.msg);
					$('#waitForValidEmail').modal({backdrop: 'static', keyboard: false});
					$("#waitForValidEmail").modal("show");
					
				}else if(data.result == 'waitAudit') {
					$("#waitAuditModalContent").text(data.msg);
					$('#waitAuditModal').modal({backdrop: 'static', keyboard: false});
					$("#waitAuditModal").modal("show");
				}else if(data.result == 'auditNoSuccess') {
					
					/*$("#auditNoSuccessModalContent").text(data.msg);
					$('#auditNoSuccessModal').modal({backdrop: 'static', keyboard: false});
					$("#auditNoSuccessModal").modal("show");*/
					$("#auditFailModalContent").text(data.msg);
					$('#auditFailModal').modal({backdrop: 'static', keyboard: false});
					$("#auditFailModal").modal("show");
				}else if(data.result == 'phoneNumExistBindPlease') {
					var _email = data.email;
					if(_email == undefined || _email== null || _email == '') {
						_email = "空";
					}
					var textContent = "您输入的手机号码【"+$("#PhoneNum").val()+"】已存在,关联邮箱为【"+_email+"】,当前为【待绑定】状态";
					
					$("#signSuccessBtn").text("确定");
					$("#signSuccessModalContent").text(textContent);
					$('#signSuccessModal').modal({backdrop: 'static', keyboard: false});
					$("#signSuccessModal").modal("show");
				
				}else if(data.result == 'phoneNumAlreadyBind') {
					var _email = data.email;
					if(_email == undefined || _email== null || _email == '') {
						_email = "空";
					}
					
					var textContent = "您输入的手机号码【"+$("#PhoneNum").val()+"】已存在,关联邮箱为【"+_email+"】,当前为【已绑定】状态";
				
					$("#signSuccessBtn").text("确定");
					$("#signSuccessModalContent").text(textContent);
					$('#signSuccessModal').modal({backdrop: 'static', keyboard: false});
					$("#signSuccessModal").modal("show");
				}else if(data.result == 'alreadyBind') {
					$("#signSuccessBtn").text("确定");
					$("#signSuccessModalContent").text("您的账号【"+$("#overseaEmail").val()+"】已经绑定，请勿重复操作");
					$('#signSuccessModal').modal({backdrop: 'static', keyboard: false});
					$("#signSuccessModal").modal("show");
					
				}else if(data.result == 'existBindPlease') {
					
					$("#existBindPleaseModelContent").text("您的账号【"+$("#overseaEmail").val()+"】已存在，请绑定");
					$('#existBindPleaseModel').modal({backdrop: 'static', keyboard: false});
					$("#existBindPleaseModel").modal("show");
				}else if('openInWeixinPlease' == data.result) {
					$("#singleBtnModalContent").text("请在微信中打开");
					$("#singleBtn").text("确定");
					 $("#getVerifyCode").attr("disabled",false);
					$('#singleBtnModal').modal({backdrop: 'static', keyboard: false});
					$("#singleBtnModal").modal("show");
				} else if(data.result == 'success') {
					$("#first").hide();
					$("#userName").text($("#DoctorName").val());
					$("#second").show();
					firstSubmitSuccessSetCookie();
				}else if("openInWeixinPlease" == data.result) {
					showUploadResult('请在微信中打开');
				}else if(data.result == 'exist') {
					showUploadResult('手机号已存在');
				}else if(data.result == 'fail') {
					showUploadResult('失败,请重试');
				}else if(data.result == 'lackRequiredField') {
					showUploadResult('缺少必填字段,请重试');
	 			}else {
				}
			},
			error : function(data) {
				$("#dataLoad").hide();
				showUploadResult('失败，请重试');
			}
		});  
	}
}
//2次提交
function secondSubmit() {
	/*var email = $("#email").val();
	if(email == null || email == undefined || email == 'undefined' || email == '') {
		email == "";
	}*/
	$("#dataSubmit").show();
	var secondSubUrl = "doctor/signUpSecondSubData";
	 $.ajax({
		url : secondSubUrl,
		type : 'post',
		cache : false,
		dataType : 'json',
    	 data : {
    		// 'overSea':
    	  'oversea' : $("#firstOverSea").val(),
	      'phoneNum':$("#firstWhich").val(),
	      'overseaEmail':$("#firstWhich").val(),
	      'verifyCode':$("#verifyCode").val(),
	      'hospital':$("#hospital").val(),
	      'department':$("#department").val(), 
	      'position':$("#position").val(),
	      'skilledField':$("#skilledField").val(),
	      'selfIntro':$("#selfIntro").val(),
	      'doctorCertNo':$("#doctorCertNo").val(),
	      //'chargingStandard':$("#chargingStandard").val(),
	      'email':$("#email").val(),
	      'selfPhotoUrl':$("#selfPhotoUrlHidden").val()
	     },
		success : function(data) {
			$("#dataSubmit").hide();
			if(data.result == 'success' && data.emailAccount == "emailAccount") {
				$("#signSuccessModalContent").text("您的资料提交成功,请您到【"+data.phoneNum+"】邮箱中点击激活链接完成注册");//这里用得是signUpPage内的signSuccessModal模态框不是公共的
				$('#signSuccessModal').modal({backdrop: 'static', keyboard: false});
				$("#signSuccessModal").modal("show");
				
				var expiresHours = 7*24;
				var registerStatus = "OK";
				addCookie("registerStatus",registerStatus,expiresHours);
			
			}else if(data.result == 'success') {
				//$("#alertContent").css({"font-size":"13px"})
			//	$("#alertContent").text('提交成功,待审核中');
			//	showMaskAlert();
//$("#phoneNumHidden").val(data.phoneNum);
//window.location.href="doctor/waitAudit?phoneNum="+$("#phoneNumHidden").val();
				$("#signSuccessModalContent").text("您的账号【"+data.phoneNum+"】注册成功,等待审核");//这里用得是signUpPage内的signSuccessModal模态框不是公共的
				$('#signSuccessModal').modal({backdrop: 'static', keyboard: false});
				$("#signSuccessModal").modal("show");
				
				var expiresHours = 7*24;
				var registerStatus = "OK";
				addCookie("registerStatus",registerStatus,expiresHours);
				
				
			}else if(data.result == 'fail') {
				//$("#alertContent").text('失败,请重试');
				//showMaskAlert();
				$("#2btnModalContent").text("失败");
				$('#2btnModal').modal({backdrop: 'static', keyboard: false});
				$("#2btnModal").modal("show");
			}else {
			}
		},
		error : function(data) {
		}
	});  
}

function getFileName(o){
    var pos=o.lastIndexOf("\\");
    return o.substring(pos+1);  
}

//定时器对象
var uploadProcessTimer = null;

//获取文件上传进度
function getFileUploadProcess() {
	$.get('upload/getFileProcessServlet', function(data) {
		$('#fileUploadProcess').html(data);
	});
}

function hideUploadResultModal() {
	$("#toastModal").modal('hide');
}

function showUploadResult(msg) {
	/*$("#singleBtnModalContent").text(msg);
	$("#singleBtn").text("确定");
	$('#singleBtnModal').modal({backdrop: 'static', keyboard: false});
	$("#singleBtnModal").modal("show");*/
	
	$("#toastModalModalContent").text(msg);
	//$("#singleBtn").text("确定");
	$('#toastModal').modal({backdrop: 'static', keyboard: false});
	$("#toastModal").modal("show");
	
	setTimeout(hideUploadResultModal,1500);
}

function ajaxFileUpload() {
	var file = $("#fileToUpload").val();
	var fileName = getFileName(file);
	if(fileName == ''|| fileName.length<=0) {
		showUploadResult("请选择文件");
		return;
	}
	$("#dataUpload").show();
	
	$.ajaxFileUpload ({
		url:'upload/ajaxUploadServlet',
		secureuri:false,
		fileElementId:'fileToUpload',
		dataType: 'json',
		data:{"name": $("#firstWhich").val()},
		success: function (data, status) {
			$("#fileName").val("");
			$("#dataUpload").hide();
			
			$("#uploadBtn").removeClass('error');
			$("#selfPhotoAlert").css({"display":"none"})

			showUploadResult(data['message']);
			//上传成功
			
			$("#selfPhotoUrlHidden").val(data.url);
			$("#photo").attr("src",data.url+"?t="+new Date().getTime());
			$("#photo").show();
		},
		error: function (data, status, e){
			showUploadResult('失败，请重试');
		}
	})
}

function check() {
    if ($("#InfoInput").valid()) {
        return true;
    }
    else {
        return false;
    }
}

function firstCheckForNextStep() {
    if ($("#InfoInput1").valid()) {
        return true;
    } else {
        return false;
    }
}

function secondCheckForSubmit() {
	checkPhoto();
    if ($("#InfoInput2").valid()) {
        return true;
    } else {
        return false;
    }
}

function changeUploadBtnDanger() {
	$("#uploadBtn").removeClass('btn-danger');
}
function changeUploadBtn() {
	$("#uploadBtn").addClass('btn-danger');
	setTimeout(changeUploadBtnDanger,200);
}

function checkPhoto() {
	if($("#selfPhotoUrlHidden").val() == ''||$("#selfPhotoUrlHidden").val().length<=0) {
		var c = "<label id='selfPhotoAlert' for='fileToUpload' >请选择图片</label>";
		if($("#fileName").val().trim() == '' && document.getElementById("selfPhotoAlert") == null) {
			$("#fileName").addClass('error');
			$("#fileToUploadGroup").append(c);
			$("#selfPhotoAlert").css({
				"display":"block","color":"red",   
				"position": "absolute",
				"top": "33px"
			})
		}else if($("#fileName").val().trim() != ''){
			$("#uploadBtn").addClass('error');
				
			changeUploadBtn();
		}
		return false;
	}else {
		$("#selfPhotoAlert").remove();
		return true;
	}
}


function initGetFirstSuccessCookie() {
	var Oversea = getCookie("Oversea");
	if(Oversea != "") {
		if(Oversea == "1") {//是海外
			
			 var overseaEmailGroup = "<div class='form-group ' id='overseaEmailGroup' style='display:block'>"+
	            "<label class='control-label' for='inputError1'>电子邮箱<span class='requiredField'>*</span></label>"+
	            "<input placeholder='必填项' name='overseaEmail' id='overseaEmail' class='form-control {required:true,email:true}' type='email'>"+
	            "</div>";
		        $("#overseaEmailGroup").replaceWith(overseaEmailGroup);
		
			var overseaEmail = getCookie("overseaEmail");
			if(overseaEmail != "") {
				$("#overseaEmail").val(overseaEmail);
			}
			
			 if(document.getElementById("chargingStandard") == null) {
				 var chargingStandardValue = getCookie("chargingStandard2");
				 if(chargingStandardValue == undefined || chargingStandardValue == null) {
					 chargingStandardValue = '';
				 }
				 var chargingStandard =
			 	"<div class='form-group' id='chargingStandard'>"+
		            "<label class='control-label' for='inputError1'>收费标准(元/次)<span class='requiredField'>*</span></label>"+
		            	"<input name='chargingStandard2' id='chargingStandard2' class='form-control {required:true} ' type='number' value='"+chargingStandardValue+"'>"+
		            "</div>"+
		        "</div>";
				
		    	$("#chargingStandardGroup").append(chargingStandard);	
			 }
			 
			 var emailGroup = 
		   "<input type='hidden' id='emailGroup' '>";
			 
			 $("#emailGroup").replaceWith(emailGroup);
			 
			 var overseaEmail =  "";
			 if(getCookie("overseaEmail") != "") {
				 overseaEmail = getCookie("overseaEmail");
			 }
			 $("#overseaEmail").val(overseaEmail);
		}else if(Oversea == "0" ) {//国内
			var PhoneNum = getCookie("PhoneNum");
			if(PhoneNum != "") {
				$("#PhoneNum").val(PhoneNum);
			}
			
			
			if(document.getElementById("chargingStandard") != null) {
				$("#chargingStandard").remove();
			}
			
			 var emailGroup = 
				   "<div id='emailGroup' class='form-group '>"+
		             "<label class='control-label' for='inputError1'>电子邮箱</label>"+
		             "<input name='email' id='email' class='form-control {email:true}' type='email'>"+
				    "</div>";
					 
					 $("#emailGroup").replaceWith(emailGroup);
		}
	}
	
	var Sex = getCookie("Sex");
	if(Oversea != "") {
		//TODO 删掉	$("input[name=Sex][value="+Sex+"]").attr("checked",true);
	}
	
	var DoctorName = unescape(getCookie("DoctorName"));
	if(DoctorName != "") {
		$("#DoctorName").val(DoctorName);
		$("#userName").text(DoctorName);
	}
	
	var verifyCode = getCookie("verifyCode");
	if(verifyCode !="" ) {
//		$("#verifyCode").val(verifyCode);
	}
	
	var IDCard = getCookie("IDCard");
	if(IDCard != "") {
		$("#IDCard").val(IDCard);
	}
}


function initGetCookie() {
	
	var registerStatus = getCookie("registerStatus");
	/*if(registerStatus != "" && registerStatus == "OK") {
		//window.location.href="doctor/waitAudit";
		//在这里隐藏 注册页面
		$("#Div1").css({"display":"none"});
			$("#alreadyRegisteModalContent").text("您已经完成注册,账号等待审核中");
			$("#alreadyRegisteModalBtn").text("确定");
			$('#alreadyRegisteModal').modal({backdrop: 'static', keyboard: false});
			$("#alreadyRegisteModal").modal("show");
		return;
	}*/
	
	var firstSubmitStatus = getCookie("firstSubmitStatus");
	if(firstSubmitStatus != "" && firstSubmitStatus == "Success") {
		//TODO 取消掉		$("#first").hide();
		$("#second").show();
	}
	//initGetFirstSuccessCookie();
}

function firstSubmitSuccessSetCookie() {
	var expiresHours = 7*24;
	addCookie("firstSubmitStatus","Success",expiresHours);
}

function initSetCookie() {
	var expiresHours = 7*24;
	try {
	var Oversea = $("input:radio[name='Oversea']:checked").val();
	}catch(e){
		console.log(e);
	}
	addCookie("Oversea",Oversea,expiresHours);
	var Sex = $('input:radio[name=Sex]:checked').val();
	addCookie("Sex",Sex,expiresHours);
	
	addCookie("DoctorName",$("#DoctorName").val(),expiresHours);
	
	addCookie("PhoneNum",$("#PhoneNum").val(),expiresHours);
	
	addCookie("overseaEmail",$("#overseaEmail").val(),expiresHours);
	
	addCookie("verifyCode",$("#verifyCode").val(),expiresHours);
	var idCard = $("#IDCard").val();
	addCookie("IDCard",idCard,expiresHours);
	addCookie("chargingStandard2",$("#chargingStandard2").val(),expiresHours);
}

function verifyCodeSecond() {
	var error =  "<label class='error' id='phoneError' generated='true' for='PhoneNum'>无效的手机号码</label>";
	var phoneNum = $("#PhoneNum").val();
	if(!checkMobile(phoneNum)) {
		if(document.getElementById("phoneError") == null) {
			$("#phoneNumGroup").append(error);
			return;
		}
	}else {  
		$("#phoneError").remove();
		if($("#getVerifyCode").attr("disabled") != 'disabled') {
			$("#getVerifyCode").attr("disabled", true);
			verifyPhoneNumExist();
		}
	}
}


//重新获取账号激活邮箱
function getEmailValidAgain() {
	$("#dataUpload2").show();
	var url = "doctor/getEmailValidAgain";
	 $.ajax({ 
		url : url,
		type : 'get',
		cache : false,
		dataType : 'json',
	 	data : {
 		      'email' : $("#which").val().trim()
 	     },
		success : function(data) {
			$("#waitForValidEmail").modal('hide');
			$("#dataUpload2").hide();
			if(data.result == 'success') {
  				$("#getEmailValidResponseModalContent").text("激活邮件已再次下发到【"+$("#which").val()+"】邮箱，请到该邮箱中点击激活链接完成注册");
  				$('#getEmailValidResponseModal').modal({backdrop: 'static', keyboard: false});
  				$("#getEmailValidResponseModal").modal("show");
			}else if("notExist" == data.result) {
				$("#getEmailValidResponseModalContent").text("您的账号【"+$("#which").val()+"】，不存在");
  				$('#getEmailValidResponseModal').modal({backdrop: 'static', keyboard: false});
  				$("#getEmailValidResponseModal").modal("show");
			}else if("fail" == data.result) {
				$("#getEmailValidResponseModalContent").text("失败，请稍后重试");
  				$('#getEmailValidResponseModal').modal({backdrop: 'static', keyboard: false});
  				$("#getEmailValidResponseModal").modal("show");
			}
		},
		error : function(data) {
			$("#waitForValidEmail").modal('hide');
			$("#dataUpload2").hide();
			//$("#warn").text("失败请重试");
			$("#getEmailValidResponseModalContent").text("失败，请稍后重试");
			$('#getEmailValidResponseModal').modal({backdrop: 'static', keyboard: false});
			$("#getEmailValidResponseModal").modal("show");
		}
	});  
}

function initBlurEvent() {
	$("#PhoneNum").blur(function() {
		$("#InfoInput1").valid();
	});
	$("#verifyCode").blur(function() {
		$("#InfoInput1").valid();
	});
	$("#IDCard").blur(function() {
		$("#InfoInput1").valid();
	});
	$("#overseaEmail").blur(function() {
		$("#InfoInput1").valid();
	});
	$("#chargingStandard2").blur(function() {
		$("#InfoInput1").valid();
	});
}

function registeNew() {
	$("#signUpAgain").val(1);
	$("input[name=Oversea][value=0]").attr("checked",true);
	$("input[name=Sex][value=1]").attr("checked",true);
	$("#DoctorName").val('');
	$("#PhoneNum").val('');
	$("#verifyCode").val('');
	$("#IDCard").val('');
	
	$("#chargingStandard").val('');
	$("#email").val('');
	
	$("#second").hide();
	$("#first").show();
	$("#onlyFinishFirstStepModal").modal("hide");
}

$(function() {	
	$("#protocol").click(function() {
		$("#page").css({"display":"none"})
		$("#protocolGroup").css({"display":"block"})
	});
	
	$("#returnBtn").click(function() {
		$("#protocolGroup").css({"display":"none"})
		$("#page").css({"display":"block"})
	});
	
	
	initBlurEvent();
	
	$("#auditFailModalBtn").click(function() {
		$("#auditFailModal").hide();
		WeixinJSBridge.call('closeWindow');
	})
	
	$("#getEmailValidResponseModal-btn").click(function() {
		$("#getEmailValidResponseModal").modal("hide");
		WeixinJSBridge.call('closeWindow');
	})
	
	$("#existBindPleaseModel-leftBtn").click(function() {
		$("#existBindPleaseModel").modal("hide");
		WeixinJSBridge.call('closeWindow');
	})
	
	$("#existBindPleaseModel-rightBtn").click(function() {//
		window.location.href="doctor/signInPage";
	})
	
	
	$("#auditNoSuccessModal-leftBtn").click(function() {//审核未通过 返回
		$("#auditNoSuccessModal").modal("hide");
		WeixinJSBridge.call('closeWindow');
	})
	$("#auditNoSuccessModal-rightBtn").click(function() {//补全资料
		
	})
	
	
	
	$("#waitAuditModalBtn").click(function() {
		$("#waitAuditModal").modal("hide");
		WeixinJSBridge.call('closeWindow');
	})
	
	$("#waitForValidEmail-leftBtn").text("返回").click(function() {
		$("#waitForValidEmail").modal('hide');
		WeixinJSBridge.call('closeWindow');
	})
	$("#waitForValidEmail-rightBtn").text("重新下发").click(function() {
		getEmailValidAgain();
	})
	
	
	
		
	if($("#first-status").val() == 'onlyFinishFirstStep') {
		var firstSubmitStatus = getCookie("firstSubmitStatus");
		if(firstSubmitStatus != "" && firstSubmitStatus == "Success") {
			var Oversea = getCookie("Oversea");
			if(Oversea != "") {
			}	
		}
		
		if($("#continueStep").val() == "completeDoctorInfo") {
			$("#onlyFinishFirstStepModal").modal("hide");
			$("#first").hide();
			$("#userName").text($("#firstDoctorName").val());
			if($("#firstOverSea").val() == 1) {
				$("#emailGroup").replaceWith("<input id='emailGroup' type='hidden' >");
				 var doctorCertNoGroup = 
				        "<div id='doctorCertNoGroup' class='form-group '>"+
				        	"<label class='control-label' for='inputError1'>医师资格证号码<span class='requiredField'>*</span></label>"+
				        	"<input placeholder='必填项' name='doctorCertNo' id='doctorCertNo' class='form-control {required:true}' type='text'>"+
				        "</div>";
		        $("#doctorCertNoGroup").replaceWith(doctorCertNoGroup);
				     
			} else {
				 var doctorCertNoGroup = 
			        "<div id='doctorCertNoGroup' class='form-group '>"+
			        	"<label class='control-label' for='inputError1'>医师资格证号码</label>"+
			        	"<input placeholder='必填项' name='doctorCertNo' id='doctorCertNo' class='form-control ' type='text'>"+
			        "</div>";
		        $("#doctorCertNoGroup").replaceWith(doctorCertNoGroup);
			}
			
			$("#second").show();
		} else	if($("#continueStep").val() == "registeNew") {
			registeNew();
		}else {
			$('#onlyFinishFirstStepModal').modal({backdrop: 'static', keyboard: false});
			$("#onlyFinishFirstStepModal").modal("show");
		}
	}else if($("#first-status").val() == 'waitForValidEmail' && $("#continueStep").val() == "registeNew") {
		registeNew();
	}
	if($("#first-status").val() == 'waitForValidEmail' && $("#continueStep").val() == "registeNew") {
		registeNew();
	}
	if($("#continueStep").val() == "registeNew") {
		registeNew();
	}
	
	
	$("#onlyFinishFirstStepModal-leftBtn").text("重新注册").click(function() {
		registeNew();
	})
	
	$("#onlyFinishFirstStepModal-rightBtn").text("完善资料").click(function() {
		$("#onlyFinishFirstStepModal").modal("hide");
		//initGetCookie();
		$("#first").hide();
		$("#userName").text($("#firstDoctorName").val());
		if($("#firstOverSea").val() == 1) {
			$("#emailGroup").replaceWith("<input id='emailGroup' type='hidden' >");
			 var doctorCertNoGroup = 
			        "<div id='doctorCertNoGroup' class='form-group '>"+
			        	"<label class='control-label' for='inputError1'>医师资格证号码<span class='requiredField'>*</span></label>"+
			        	"<input placeholder='必填项' name='doctorCertNo' id='doctorCertNo' class='form-control {required:true}' type='text'>"+
			        "</div>";
	        $("#doctorCertNoGroup").replaceWith(doctorCertNoGroup);
			     
		} else {
			 var doctorCertNoGroup = 
		        "<div id='doctorCertNoGroup' class='form-group '>"+
		        	"<label class='control-label' for='inputError1'>医师资格证号码</label>"+
		        	"<input placeholder='必填项' name='doctorCertNo' id='doctorCertNo' class='form-control ' type='text'>"+
		        "</div>";
	        $("#doctorCertNoGroup").replaceWith(doctorCertNoGroup);
		}
		
		$("#second").show();
	})
		
	$("#alreadyRegisteModalBtn").click(function() {//查询账号审核状态
		$("#alreadyRegisteModal").modal("hide");
		WeixinJSBridge.call('closeWindow');
		/*
		$("#queryAccountModalBtn").text("关闭");
		$('#queryAccountModal').modal({backdrop: 'static', keyboard: false});
		$("#queryAccountModal").modal("show");*/
	})
	
	
	$("#singleBtn").text("确定").click(function() {
		// WeixinJSBridge.call('closeWindow');
		
		$("#singleBtnModal").modal('hide');
	})
	$("#2btnModal-leftBtn").text("绑定").click(function() {
		$("#2btnModal").hide();
	    window.location.href="doctor/signInPage";
	})
	$("#2btnModal-rightBtn").text("重试").click(function() {
		$("#2btnModal").hide();
		window.location.href="doctor/signUpPage?protocolConfirm=1&timestamp="+new Date().getTime();
	})
	
	$("#signSuccessBtn").text("确定").click(function() {
		$("#signSuccessModal").modal("hide");
		WeixinJSBridge.call('closeWindow');
	})
    	
	
	 var tel = /^([0-9]|[0-1][0-9]|[2][0-3]):([0-5][0-9])$/;
	 var error =  "<label class='error' id='phoneError' generated='true' for='PhoneNum'>无效的手机号码</label>";
	$("#getVerifyCode").click(function() {
		var phoneNum = $("#PhoneNum").val();
		if(!checkMobile(phoneNum)) {
			if(!$("#PhoneNum").hasClass("error")) {
				if(document.getElementById("phoneError") == null) {
					$("#phoneNumGroup").append(error);
					return;
				}
				return false;
			}
		}else {  
			$("#phoneError").remove();
			if($("#getVerifyCode").attr("disabled") != 'disabled') {
				$("#getVerifyCode").attr("disabled", true);
				verifyPhoneNumExist();
			}
		}
	});
	
	
	$('#addrRadioGroup input').on('ifChecked', function(event){
		//console.log(event.target.value)
		if(event.target.value == 1) {//海外
	        var chargingStandard ="<div class='form-group' id='chargingStandard'>"+
	                "<label class='control-label' for='inputError1'>收费标准(元/次)<span class='requiredField'>*</span></label>"+
	                "<input name='chargingStandard2' id='chargingStandard2' placeholder='必填项' class='form-control {required:true} ' type='number'>"+
	            "</div>"+
            "</div>";
	        if(document.getElementById("chargingStandard") == null) {
	        	$("#chargingStandardGroup").append(chargingStandard);	
			}
	        
	        $("#emailGroup").replaceWith("<input type='hidden' id='emailGroup' >");
	       
	        $("#phoneNumGroup").replaceWith("<input type='hidden' id='phoneNumGroup'>");
	        var phoneNumGroup2 = "<div class='form-group ' id='phoneNumGroup2'>"+
            "<label class='control-label' for='inputError1'>手机号码</label>"+
            "<input placeholder='选填项' name='PhoneNum' id='PhoneNum' maxlength='11' class='form-control {maxlength:11}' type='tel'>";
	        "</div>"; 
        
	        $("#phoneNumGroup2").replaceWith(phoneNumGroup2);
	        
	        var overseaEmailGroup = "<div class='form-group ' id='overseaEmailGroup' style='display:block'>"+
            "<label class='control-label' for='inputError1'>电子邮箱<span class='requiredField'>*</span></label>"+
            "<input placeholder='必填项' name='overseaEmail' id='overseaEmail' class='form-control {required:true,email:true}' type='email'>"+
            "</div>";
	        $("#overseaEmailGroup").replaceWith(overseaEmailGroup);
	        
	        
	        $("#verifyCodeGroup").replaceWith("<input type='hidden' id='verifyCodeGroup' >");
	        var idCard = 
	        "<div class='form-group ' id='idCardGroup'>"+
	        	"<label class='control-label' for='inputError1'>身份证号码/护照</label>"+
	        	"<input placeholder='选填项' name='IDCard' id='IDCard' class='form-control ' type='number'>"+
            "</div>";
	        $("#idCardGroup").replaceWith(idCard);
	        
	        var doctorCertNoGroup = 
	        "<div id='doctorCertNoGroup' class='form-group '>"+
	        	"<label class='control-label' for='inputError1'>医师资格证号码<span class='requiredField'>*</span></label>"+
	        	"<input placeholder='必填项' name='doctorCertNo' id='doctorCertNo' class='form-control {required:true}' type='text'>"+
	        "</div>";
	        $("#doctorCertNoGroup").replaceWith(doctorCertNoGroup);
	        
		}else {//国内
			if(document.getElementById("chargingStandard") != null) {
				$("#chargingStandard").remove();
			}
			
			/*if(document.getElementById("overseaEmailGroup") != null){
				$("#overseaEmailGroup").remove();
			}*/
			
			var emailGroup = 
			 "<div id='emailGroup' class='form-group '>"+
             "<label class='control-label' for='inputError1'>电子邮箱</label>"+
             "<input name='email' id='email' class='form-control {email:true}' type='email'>"+
             "</div>";
			$("#emailGroup").replaceWith(emailGroup);
			
			var verifyCodeGroup = 
			"<div id='verifyCodeGroup' class='row' style='margin-bottom:15px;'>"+
    		"<label class='control-label' style='margin-left:15px;' for='inputError1'>验证码<span class='requiredField'>*</span></label>"+
    		"<div>"+
            	"<div class='col-xs-8' style='padding-right:10px;' >"+
               		"<input placeholder='必填项' type='number' class='form-control {required:true,verifyCode:true}' id='verifyCode' name='verifyCode'>"+
            	"</div>"+
            	"<div class='col-xs-4' style='padding-left:0;' >"+
               	 	"<a id='getVerifyCode'  class='form-control btn-primary' style='text-decoration: none;text-align:center;font-size: 12px;padding-left:0;padding-right:0;margin-left:0;margin-right:0;background:#00abec;border: none;outline: none;cursor: pointer;padding-top:8px;text-shadow:none;color:white;'>获取验证码</a>"+
        		"</div>"+
   		 	"</div>"+
   		 	"</div>";
			$("#verifyCodeGroup").replaceWith(verifyCodeGroup);
			$("#getVerifyCode").click(function() {
				var phoneNum = $("#PhoneNum").val();
				if(!checkMobile(phoneNum)) {
					if(document.getElementById("phoneError") == null) {
						$("#phoneNumGroup").append(error);
						return;
					}
				}else {  
					$("#phoneError").remove();
					if($("#getVerifyCode").attr("disabled") != 'disabled') {
						$("#getVerifyCode").attr("disabled", true);
						verifyPhoneNumExist();
					}
				}
			});
			
			 var phoneNumGroup = "<div class='form-group ' id='phoneNumGroup'>"+
	            "<label class='control-label' for='inputError1'>手机号码<span class='requiredField'>*</span></label>"+
	            "<input placeholder='必填项' maxlength='11' name='PhoneNum' id='PhoneNum' class='form-control {required:true,mobile:true}' type='tel'>";
		        "</div>";
			
		    $("#phoneNumGroup").replaceWith(phoneNumGroup);
		    $("#phoneNumGroup2").replaceWith("<input type='hidden' id='phoneNumGroup2'>");
			$("#overseaEmailGroup").replaceWith(" <input id='overseaEmailGroup' type='hidden'>");
			
			
			 var idCard = 
			        "<div class='form-group ' id='idCardGroup'>"+
			        	"<label class='control-label' for='inputError1'>身份证号码<span class='requiredField'>*</span></label>"+
			        	"<input placeholder='必填项' maxlength='11' name='IDCard' id='IDCard' class='form-control {required:true,isIdCardNo:true}' type='number'>"+
		            "</div>";
	        $("#idCardGroup").replaceWith(idCard);
			        
	        
	        var doctorCertNoGroup = 
	        "<div id='doctorCertNoGroup' class='form-group '>"+
	        	"<label class='control-label' for='inputError1'>医师资格证号码</label>"+
	        	"<input placeholder='选填项' name='doctorCertNo' id='doctorCertNo' class='form-control {minlength:5,maxlength:20}' type='text'>"+
	        "</div>";
	        $("#doctorCertNoGroup").replaceWith(doctorCertNoGroup);
		}
	}).iCheck({
		  checkboxClass: 'icheckbox_square-blue',
		  radioClass: 'iradio_square-blue',
		  increaseArea: '20%'
	});
	
	$('#sexRadioGroup input').on('ifChecked', function(event){
		//console.log(event.target.value)
		
	}).iCheck({
		  checkboxClass: 'icheckbox_square-blue',
		  radioClass: 'iradio_square-blue',
		  increaseArea: '20%'
	});
	
	/*
	$('input:radio[name=Oversea]').each(function(i) {
		$(this).click(function() {
			var checkVal = $('input:radio[name=Oversea]:checked').val();
			if(checkVal == 1) {
		        var chargingStandard ="<div class='form-group' id='chargingStandard'>"+
		                "<label class='control-label' for='inputError1'>收费标准</label>"+
		                "<input name='chargingStandard2' id='chargingStandard2' class='form-control {required:true} ' type='text'>"+
		            "</div>"+
	            "</div>";
		        if(document.getElementById("chargingStandard") == null) {
		        	$("#chargingStandardGroup").append(chargingStandard);	
				}
			}else {
				if(document.getElementById("chargingStandard") != null) {
					$("#chargingStandard").remove();
				}
			}
		})
	})*/
	
	
	$("#nextStep").click(function() {
		var result = firstCheckForNextStep();
		if(result) {
			$("#dataLoad").show();
			
			initSetCookie();
			firstSubmit();
		}
	})
	
	$("#secondSubmit").click(function() {
		var result1 = secondCheckForSubmit();
		var result2= checkPhoto();
		if(result1 && result2) {
			secondSubmit();
		}
	})
	
	$("#uploadBtn").click(function() {
		ajaxFileUpload();
	});
	$("#fileToUpload").change(function() {
		/*$("#fileBox").removeClass('error');*/
		$("#fileName").removeClass('error');
		var file = $("#fileToUpload").val();
		var fileName = getFileName(file);
		if(fileName != null && fileName != '') {
			if(document.getElementById("selfPhotoAlert") != null) {
				$("#selfPhotoAlert").remove();
			}
		}
		$("#fileName").val(fileName);
	})
})