<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ include file="../common/common.jsp"%>  
<%@ include file="../common/noCache.jsp"%> 
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
<link rel="Stylesheet" type="text/css" href="static/css/common/alertDialog.css?timestamp=<%=randomNum%>"/>

    <script src="static/aspwx/js/jquery.metadata.js?timestamp=<%=randomNum%>"></script>
    <script src="static/aspwx/js/jquery.validate.js?timestamp=<%=randomNum%>"></script>
    <script src="static/aspwx/js/global.js?timestamp=<%=randomNum%>"></script>
<title></title>
<style>
	@media screen and (max-width: 600px) {
	  	.modal-dialog {
	    	width: 250px;
	    	margin: 30px auto;
		}
	}
	
 	.form-control {
 	  outline:none;
 	  border:1px solid #ccc;
	  display: block;
	  width: 100%;
	  height: 34px;
	  padding: 6px 12px;
	  font-size: 14px;
	  line-height: 1.42857143;
	  color: #555;
	  background-color: #fff;
	  background-image: none;
	 /*  border: 1px solid #ccc; */
	  border-radius: 4px;
	  -webkit-box-shadow: none;
	          box-shadow: none;
	  -webkit-transition: none;
	       -o-transition: none;
	          transition: none;
	}
	.form-control:focus {
		outline:none;
		border:none;
		border:1px solid #ccc;
	  	border-color: none;
	  	-webkit-box-shadow: none;
	          box-shadow: none;
	}
	#xiazai{
		display:inline-block;
		margin:0 auto;
		width:162px;
		height:60px;
		background:url(static/img/xiazai.png);
		background-size:162px 56px;
		background-repeat:no-repeat;
		
	}
</style>

</head>


<!-- 继续将删除已绑定账号-->
<div class="modal fade" id="deleteAlreadyExistAccountModal" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="false">
    <div class="modal-dialog" style="top:75px">
        <div class="modal-content">
            <div id="deleteAlreadyExistAccountModalContent" class="modal-body" style="font-size: 15px;text-align: center;color:#333333;">
              
            </div>
          	<div class="modal-footer" style="padding:0">
               <form class="form-horizontal"  style="">
					  <div class='col-xs-6' style="text-align:center;padding:0;border-right:1px solid #E5E5E5">
 		            <!-- 	<button id="signUpBtn" type="button" class="btn btn-primary btn-lg btn-block" style="border-radius:0;border:none;background:white" >注册</button> -->
 		           		<div id="deleteAlreadyExistAccountModal-leftBtn" class="btn-lg btn-block" style="font-size:16px;color:#3C95FE;margin-top: 2px;margin-bottom: 2px;cursor:point">返回</div>
 		              </div>
 		            <div class='col-xs-6' style="text-align:center;padding:0">
 		            	<!-- <button id="retryBtn" type="button" class="btn btn-primary btn-lg btn-block" style="border-radius:0" >重试</button> -->
 		            	<div id="deleteAlreadyExistAccountModal-rightBtn" class="btn-lg btn-block" style="font-size:16px;color:#3C95FE;margin-top: 2px;margin-bottom: 2px;cursor:point">继续</div> 
 		            </div>
				</form>
            </div>
        </div>
    </div>
</div>

<body>

<input id="baseUrl" type="hidden" value="<%=basePath %>">

<!-- 正在加载中 -->
<div id="dataLoad" class="container" style="display: none">
            <div class="col-xs-12 pos" style="position:fixed">
                <div  style="display:inline-block;width: 200px;height: 100px;display:inline-block;position: relative;border-radius: 4px;padding-top: 21px;background: white;">
                    <div class="">
                       <img src="static/img/refresh.gif"/>
                    </div>
                    <span id="" class="" style="color:#999999">载入中，请稍后......</span>
                </div>
            </div>
    </div>
<!-- 正在加载中 -->

<div id="signIning" class="container" style="display: none">
           <div class="col-xs-12 pos" style="position:fixed;top:26%;">
               <div  style="display:inline-block;width: 200px;height: 100px;display:inline-block;position: relative;border-radius: 4px;padding-top: 21px;background: white;">
                   <div class="">
                      <img src="static/img/refresh.gif" />
                   </div>
                   <span id=""style="font-size:13px;color:#999999">查询中，请稍后...</span>
               </div>
           </div>
   </div>

<div id="dataLoding" class="container" style="display: none">
           <div class="col-xs-12 pos" style="position:fixed;top:26%;">
               <div  style="display:inline-block;width: 200px;height: 100px;display:inline-block;position: relative;border-radius: 4px;padding-top: 21px;background: white;">
                   <div class="">
                      <img src="static/img/refresh.gif" />
                   </div>
                   <span id=""style="font-size:13px;color:#999999">获取中，请稍后...</span>
               </div>
           </div>
   </div>
   
<input id="redirectUrl" value="${redirectUrl}" type="hidden">
    <div id="maskAlert" style="display:none" class="container">
          <div class="col-xs-12 pos">
              <div class="body" style="background-image:url(static/img/bg.png)">
                  <div class="head">
                      <span id="alertTitle" class="title">提示</span>
                      <a id="alertCloseBtn" href="javascript:void(0)" title="关闭窗口" class="close_btn" style="text-decoration: none">×</a>
                  </div>
                  <span id="alertContent" class="alertContent"></span>
              </div>
          </div>
    </div>
    
<!-- 重新获取激活邮件 -->
<div id="dataUpload2" class="container" style="display: none">
           <div class="col-xs-12 pos" style="position:fixed;top:26%;">
               <div  style="display:inline-block;width: 200px;height: 100px;display:inline-block;position: relative;border-radius: 4px;padding-top: 21px;background: white;">
                   <div class="">
                      <img src="static/img/refresh.gif" />
                   </div>
                   <span id=""style="font-size:13px;color:#999999">获取中，请稍后...</span>
               </div>
           </div>
   </div>
    
<!-- 重新获取激活邮件 -->
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



<div id="result" class="container" style="">
	<div class='form-group' style='margin-top:45px;'>
	<div style='text-align:center'>
		<img alt='' src='static/img/subscribe-success.png' style='width:60px;height:60px'>
	</div>
	</div>
	<div class='form-group' style='margin-top:19px;margin-bottom:50px'>
		<div style='color:#333333;text-align:center;font-size:19px;'>已成功关注医生</div>
	</div>
	
	<!-- <div class='form-group' style='padding-left:10%;padding-right:10%;margin-bottom:7px;'>
		<input click='' name='loginInBtn' id='loginInBtn' type='button' class='btn btn-success btn-lg btn-block' style='background:#00abec;border: none;outline: none;margin-top:21px;margin-bottom:45px;text-shadow:none;font-size:17px;height:40px;margin-bottom:0;'  value='立即登录'>
    </div>
	<div class='form-group' style='padding-left:10%;padding-right:10%;margin-bottom:45px;'>
		<input onclick='' name='closeCurrentPageBtn' id='closeCurrentPageBtn' type='button' class='btn btn-success btn-lg btn-block' style='background:white;border: 1px solid #bfbfbf;outline: none;margin-bottom:25px;text-shadow:none;font-size:17px;height:40px;color:#00abec;'  value='关闭当前页'>
	</div> -->
	<div class='form-group'>
		<hr style='border-top:1px solid #dcdcdc'/>
	</div>
	<div class='form-group' style='margin-left:5%;'>
		<div>
			<p  style='margin-left:5px;margin-top:5px;margin-bottom:5px;color:#999999;font-size:16px;'>温馨提示</p>
				<ol style='margin-left:-25px;'>
					<li style='margin-bottom:5px;color:#999999'>微信公众平台上注册的账号可直接在秦医通app上登录使用。</li>
					<li style='margin-bottom:5px;color:#999999'>为保证正常使用，我院将启动黑名单管理机制。</li>
					<!-- <li style='margin-bottom:5px;'>如有疑问，欢迎咨询&nbsp;<a href='tel:400-888-3918'>400-888-3918</a></li> -->
				</ol>
		</div>
	</div>
	<div class='form-group'>
		<hr style='border-top:1px solid #dcdcdc'/>
	</div>
	
	<div class='form-group' style="width:250px;margin:0 auto;margin-top:80px;margin-bottom:25px;text-align:center;">
		<div>
			<p style='margin-bottom:15px;color:#999999;'>西京互联网医院客户端</p>
			<%-- <a href="<%=basePath %>jsp/download/index.html" id="xiazai" style=""></a> --%>
			<a href="http://update.zhongyinginfo.com:8081" id="xiazai" style=""></a>
		</div>
	</div>
</div>

</body>
</html>