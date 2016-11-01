<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ include file="../common/common.jsp"%> 
<%@ include file="../common/noCache.jsp"%>  
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
<link rel="Stylesheet" type="text/css" href="static/css/common/alertDialog.css?timestamp=<%=randomNum%>"/>
<link rel="Stylesheet" type="text/css" href="static/css/patient/wxBind.css?timestamp=<%=randomNum%>"/>
<link rel="Stylesheet" type="text/css" href="static/css/common/alertDialog.css?timestamp=<%=randomNum%>"/>
    <script src="static/aspwx/js/jquery.metadata.js?timestamp=<%=randomNum%>"></script>
    <script src="static/aspwx/js/jquery.validate.js?timestamp=<%=randomNum%>"></script>
    <script src="static/aspwx/js/global.js?timestamp=<%=randomNum%>"></script>
    <!-- 调试 添加-->
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Expires" content="0" />

	<title>账号绑定</title>
	<style>
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
	</style>
</head>
<%@ include file="../common/notOpenInWeiXin.jsp"%> 
<%@ include file="../common/modalDialog.jsp"%> 


<!-- 模态框（Modal）下边单按钮 -->
<!-- 模态框（Modal）下边双按钮 -->
<div class="modal fade" id="accountPasswdErrorModal" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="false">
    <div class="modal-dialog" style="top:75px">
        <div class="modal-content">
            <div id="accountPasswdErrorContent" class="modal-body" style="font-size: 15px;text-align: center;color:#333333;">
               	账号密码错误
            </div>
            <div class="modal-footer" style="padding:0">
               <form class="form-horizontal"  style="">
					  <div class='col-xs-6' style="text-align:center;padding:0;border-right:1px solid #E5E5E5">
 		            <!-- 	<button id="signUpBtn" type="button" class="btn btn-primary btn-lg btn-block" style="border-radius:0;border:none;background:white" >注册</button> -->
 		           		<div id="accountPasswdErrorModal-left" class="btn-lg btn-block" style="font-size:16px;color:#3C95FE;margin-top: 2px;margin-bottom: 2px;cursor:point">退出</div>
 		              </div>
 		            <div class='col-xs-6' style="text-align:center;padding:0">
 		            	<!-- <button id="retryBtn" type="button" class="btn btn-primary btn-lg btn-block" style="border-radius:0" >重试</button> -->
 		            	<div id="accountPasswdErrorModal-right" class="btn-lg btn-block" style="font-size:16px;color:#3C95FE;margin-top: 2px;margin-bottom: 2px;cursor:point">重试</div> 
 		            </div>
				</form>
            </div>
        </div>
    </div>
</div>


<body>
<!-- 正在加载中 -->
<!-- 提交中 -->
	<div id="dataSubmit" class="container" style="display: none">
            <div class="col-xs-12 pos" style="position:fixed">
                <div  style="display:inline-block;width: 200px;height: 100px;display:inline-block;position: relative;border-radius: 4px;padding-top: 21px;background: white;">
                    <div class="">
                       <img src="static/img/refresh.gif"/>
                    </div>
                    <span id="" class="" style="color:#999999">验证中，请稍后......</span>
                </div>
            </div>
    </div>
<!-- 正在加载中 -->


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

<div class="container top">
	<div id="page-wrap">
	 	<div class="row pageHead">
	    	 <div class="col-xs-12 headTitle" >账号绑定
	    	 <a href="<%=basePath %>/patient/signUpPage?redirectUrl=${redirectUrl}" class="right" id="registeBtn" style="color:#00abec">注册</a>
	    	 </div>
	    </div>
		<span id="warn"></span>
	    <form class="form-horizontal">
	    <input type="hidden" id="redirectUrl" value="${redirectUrl}">
	        <div class="form-group">
	            <div class="col-xs-12">
	                <input type="tel" class="form-control" id="patientNameOrPhoneNum" name="patientNameOrPhoneNum" placeholder="手机号码">
	            </div>
	        </div>
	        <div class="form-group">
	            <div class="col-xs-12">
	                <input type="password" class="form-control" id="passWord" name="passWord" placeholder="密码">
	            </div>
	        </div>
	        
	        <button id="signIn" type="button" class="btn btn-primary btn-lg btn-block" style="border:none;outline:none;color:" >绑定</button>
	        
	        <!--  <div class="form-group" style="margin-top:13px;">
	           <div class="col-xs-12">
		         	<div style="text-align: right;padding-right: 7px;">
		         	<a href="patient/signUpPage" style="display:inline-block;float:left;margin-left: 7px;font-size: 15px;text-decoration: none;color: #00abec;">注册</a>
		           	<a style="color:#00abec;font-size:15px" href="patient/resetPasswdPage">忘记密码</a>
		            </div>
	            </div>
        	</div> -->
        	
	    </form>
	</div>
</div>

<script src="static/js/patient/patientWxBind.js?timestamp=<%=randomNum%>"></script>
</body>
</html>