<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ include file="noCache.jsp"%>
<%@ include file="common.jsp"%> 
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
	
	$(function(){
		$('#singleBtnModal').modal({backdrop: 'static', keyboard: false});
		$("#singleBtnModal").modal("show");
		
		$("#singleBtn").click(function() {
			$("#singleBtnModal").modal("hide");
			WeixinJSBridge.call('closeWindow');
		})
	})
	
</script>
 <title>
温馨提示
</title></head>

<body>

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
