<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ include file="noCache.jsp"%>
<%@ include file="common.jsp"%> 
<link rel="Stylesheet" type="text/css" href="static/css/common/alertDialog.css?timestamp=<%=randomNum%>"/>
<style>
   /*  @media (max-width: 400px)
		.modal-dialog {
    	width: 100px;
    	margin: 30px auto;
	} */
	
	@media screen and (max-width: 600px) { /*当屏幕尺寸小于600px时，应用下面的CSS样式*/
  	.modal-dialog {
    	width: 250px;
    	margin: 30px auto;
	}
</style>
<script>
	function getEmailValidAgain() {
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
	  				$("#dataUpload").hide();
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
	  				$("#dataUpload").hide();
	  				//$("#warn").text("失败请重试");
	  				$("#getEmailValidResponseModalContent").text("失败，请稍后重试");
	  				$('#getEmailValidResponseModal').modal({backdrop: 'static', keyboard: false});
	  				$("#getEmailValidResponseModal").modal("show");
	  			}
	  		});  
	}
	
	
	$(function(){
		/* $('#singleBtnModal').modal({backdrop: 'static', keyboard: false});
		$("#singleBtnModal").modal("show");
		
		$("#singleBtn").click(function() {
			$("#singleBtnModal").modal("hide");
			WeixinJSBridge.call('closeWindow');
		}) */
		
		$("#getEmailValidResponseModal-btn").click(function() {
			$("#getEmailValidResponseModal").modal('hide');
			WeixinJSBridge.call('closeWindow');
		})
		
		$("#waitForValidEmail-leftBtn").text("返回").click(function() {
			$("#waitForValidEmail").modal('hide');
			WeixinJSBridge.call('closeWindow');
		})
		$("#waitForValidEmail-rightBtn").text("重新下发").click(function() {
			$("#dataUpload").show();
			getEmailValidAgain();
		})
		
		//if($("#waitForValidEmailStatus").val() == "waitForValidEmail") {
			$('#waitForValidEmail').modal({backdrop: 'static', keyboard: false});
			$("#waitForValidEmail").modal("show");
		//}
	})
	
</script>
 <title>
温馨提示
</title></head>

<body>
<input id="which" type="hidden" value="${which}">


<div id="dataUpload" class="container" style="display: none">
           <div class="col-xs-12 pos" style="position:fixed;top:26%;">
               <div  style="display:inline-block;width: 200px;height: 100px;display:inline-block;position: relative;border-radius: 4px;padding-top: 21px;background: white;">
                   <div class="">
                      <img src="static/img/refresh.gif" />
                   </div>
                   <span id=""style="font-size:13px;color:#999999">获取中，请稍后...</span>
               </div>
           </div>
   </div>


<!-- 模态框（Modal）下边单按钮 -->
<div class="modal fade" id="getEmailValidResponseModal" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="false">
    <div class="modal-dialog" style="top:75px">
        <div class="modal-content">
            <div id="getEmailValidResponseModalContent" class="modal-body" style="font-size: 15px;text-align: center;color:#333333;">
            
            </div>
            <div class="modal-footer" style="padding:0">
               <form class="form-horizontal"  style="">
					  <div class='col-xs-12' style="text-align:center;padding:0;border-right:1px solid #E5E5E5">
 		             	<div id="getEmailValidResponseModal-btn" class="btn-lg btn-block" style="font-size:16px;color:#3C95FE;margin-top: 2px;margin-bottom: 2px;cursor:point">确定</div>
 		              </div>
				</form>
            </div>
        </div>
    </div>
</div>







<!-- 模态框（Modal）下边单按钮 -->
<div class="modal fade" id="singleBtnModal" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="false">
    <div class="modal-dialog" style="top:75px">
        <div class="modal-content">
            <div id="singleBtnModalContent" class="modal-body" style="font-size: 15px;text-align: center;color:#333333;">
               	${msg }	
            </div>
            <div class="modal-footer" style="padding:0">
               <form class="form-horizontal"  style="">
					  <div class='col-xs-12' style="text-align:center;padding:0;border-right:1px solid #E5E5E5">
 		             	<div id="singleBtn" class="btn-lg btn-block" style="font-size:16px;color:#3C95FE;margin-top: 2px;margin-bottom: 2px;cursor:point">确定</div>
 		              </div>
				</form>
            </div>
        </div>
    </div>
</div>


<!-- 邮箱注册用户等待验证邮箱中 -->
<div class="modal fade" id="waitForValidEmail" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="false">
    <div class="modal-dialog" style="top:75px">
        <div class="modal-content">
        <input type="hidden" id="waitForValidEmailStatus" value="${result}">
            <div id="onlyFinishFirstStepModalContent" class="modal-body" style="font-size: 15px;text-align: center;color:#333333;">
              ${msg }
            </div>
          	<div class="modal-footer" style="padding:0">
               <form class="form-horizontal"  style="">
					  <div class='col-xs-6' style="text-align:center;padding:0;border-right:1px solid #E5E5E5">
 		            <!-- 	<button id="signUpBtn" type="button" class="btn btn-primary btn-lg btn-block" style="border-radius:0;border:none;background:white" >注册</button> -->
 		           		<div id="waitForValidEmail-leftBtn" class="btn-lg btn-block" style="font-size:16px;color:#3C95FE;margin-top: 2px;margin-bottom: 2px;cursor:point">返回</div>
 		              </div>
 		            <div class='col-xs-6' style="text-align:center;padding:0">
 		            	<!-- <button id="retryBtn" type="button" class="btn btn-primary btn-lg btn-block" style="border-radius:0" >重试</button> -->
 		            	<div id="waitForValidEmail-rightBtn" class="btn-lg btn-block" style="font-size:16px;color:#3C95FE;margin-top: 2px;margin-bottom: 2px;cursor:point">重新下发激活邮件</div> 
 		            </div>
				</form>
            </div>
        </div>
    </div>
</div>


<!-- 模态框（Modal）下边双按钮 -->
<div class="modal fade" id="2btnModal" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="false">
    <div class="modal-dialog" style="top:75px">
        <div class="modal-content">
            <div id="2btnModalContent" class="modal-body" style="font-size: 15px;text-align: center;color:#333333;">
               	账号不存在	
            </div>
            <div class="modal-footer" style="padding:0">
               <form class="form-horizontal"  style="">
					  <div class='col-xs-6' style="text-align:center;padding:0;border-right:1px solid #E5E5E5">
 		            <!-- 	<button id="signUpBtn" type="button" class="btn btn-primary btn-lg btn-block" style="border-radius:0;border:none;background:white" >注册</button> -->
 		           		<div id="2btnModal-leftBtn" class="btn-lg btn-block" style="font-size:16px;color:#3C95FE;margin-top: 2px;margin-bottom: 2px;cursor:point">注册</div>
 		              </div>
 		            <div class='col-xs-6' style="text-align:center;padding:0">
 		            	<!-- <button id="retryBtn" type="button" class="btn btn-primary btn-lg btn-block" style="border-radius:0" >重试</button> -->
 		            	<div id="2btnModal-rightBtn" class="btn-lg btn-block" style="font-size:16px;color:#3C95FE;margin-top: 2px;margin-bottom: 2px;cursor:point">重试</div> 
 		            </div>
				</form>
            </div>
        </div>
    </div>
</div>
</body>
</html>
