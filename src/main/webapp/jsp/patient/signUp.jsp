<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>

<%@ include file="../common/common.jsp"%>  

<title>注册信息</title>
<%@ include file="../common/noCache.jsp"%> 
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
<link rel="Stylesheet" type="text/css" href="static/css/common/alertDialog.css?timestamp=<%=randomNum%>"/>
<link rel="Stylesheet" type="text/css" href="static/css/patient/signUp.css?timestamp=<%=randomNum%>"/> 
    <script src="static/aspwx/js/jquery.metadata.js?timestamp=<%=randomNum%>"></script>
    <script src="static/aspwx/js/jquery.validate.js?timestamp=<%=randomNum%>"></script>
    <script src="static/aspwx/js/global.js?timestamp=<%=randomNum%>"></script>

  <link href="static/icheck-1.x/skins/all.css?timestamp=<%=randomNum%>" rel="stylesheet">
  <script src="static/icheck-1.x/icheck.min.js?timestamp=<%=randomNum%>"></script>
   <style>
	  .form-horizontal .form-group{
	  	margin-left:0;margin-right:0;
	  }
	  .col-xs-8{
	  	padding-right:0;
	  }
	  .requiredField{
	    color: red;
	    font-size: 19px;
	    position: absolute;
	    margin-left: 5px;
	 }
   </style>
   
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
	.titleLabel {
	}
   </style>
</head>

<%@ include file="../common/modalDialog.jsp"%> 

<!-- 已绑定请勿重复操作 -->
<div class="modal fade" id="alreadyBindModal" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="false">
    <div class="modal-dialog" style="top:75px">
        <div class="modal-content">
            <div id="alreadyBindModalContent" class="modal-body" style="font-size: 15px;text-align: center;color:#333333;">
               	${msg}	
            </div>
            <div class="modal-footer" style="padding:0">
               <form class="form-horizontal"  style="">
					  <div class='col-xs-12' style="text-align:center;padding:0;border-right:1px solid #E5E5E5">
 		             	<div id="alreadyBindModalBtn" class="btn-lg btn-block" style="font-size:16px;color:#3C95FE;margin-top: 2px;margin-bottom: 2px;cursor:point">确定</div>
 		              </div>
				</form>
            </div>
        </div>
    </div>
</div>

<!-- 已存在请绑定 -->
<div class="modal fade" id="existBindPleaseModel" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="false">
    <div class="modal-dialog" style="top:75px">
        <div class="modal-content">
        <input type="hidden" id="waitForValidEmailStatus" value="${result}">
            <div id="existBindPleaseModelContent" class="modal-body" style="font-size: 15px;text-align: center;color:#333333;">
              ${msg }
            </div>
          	<div class="modal-footer" style="padding:0">
               <form class="form-horizontal"  style="">
					  <div class='col-xs-6' style="text-align:center;padding:0;border-right:1px solid #E5E5E5">
 		            <!-- 	<button id="signUpBtn" type="button" class="btn btn-primary btn-lg btn-block" style="border-radius:0;border:none;background:white" >注册</button> -->
 		           		<div id="existBindPleaseModel-leftBtn" class="btn-lg btn-block" style="font-size:16px;color:#3C95FE;margin-top: 2px;margin-bottom: 2px;cursor:point">返回</div>
 		              </div>
 		            <div class='col-xs-6' style="text-align:center;padding:0">
 		            	<!-- <button id="retryBtn" type="button" class="btn btn-primary btn-lg btn-block" style="border-radius:0" >重试</button> -->
 		            	<div id="existBindPleaseModel-rightBtn" class="btn-lg btn-block" style="font-size:16px;color:#3C95FE;margin-top: 2px;margin-bottom: 2px;cursor:point">绑定</div> 
 		            </div>
				</form>
            </div>
        </div>
    </div>
</div>

<!-- 模态框（Modal）下边单按钮 -->
<div class="modal fade" id="validVerifyCodeModal" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="false">
    <div class="modal-dialog" style="top:75px">
        <div class="modal-content">
            <div id="validVerifyCodeModalContent" class="modal-body" style="font-size: 15px;text-align: center;color:#333333;">
               	绑定成功	
            </div>
            <div class="modal-footer" style="padding:0">
               <form class="form-horizontal"  style="">
					  <div class='col-xs-12' style="text-align:center;padding:0;border-right:1px solid #E5E5E5">
 		             	<div id="validVerifyCodeModalBtn" class="btn-lg btn-block" style="font-size:16px;color:#3C95FE;margin-top: 2px;margin-bottom: 2px;cursor:point"></div>
 		              </div>
				</form>
            </div>
        </div>
    </div>
</div>


<body>
	<!-- 提交中 -->
	<div id="dataSubmit" class="container" style="display: none">
            <div class="col-xs-12 pos" style="position:fixed">
                <div  style="display:inline-block;width: 200px;height: 100px;display:inline-block;position: relative;border-radius: 4px;padding-top: 21px;background: white;">
                    <div class="">
                       <img src="static/img/refresh.gif"/>
                    </div>
                    <span id="" class="" style="color:#999999">提交中，请稍后......</span>
                </div>
            </div>
    </div>
<!-- 正在加载中 -->


   <div id="maskAlert" class="container">
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
    <div class="row headTitle">
    	 <div class="col-xs-12 titleDesc">注册信息
    	<!--  <a href="patient/signInPage" class="right">登录</a> -->
    	 <a href="<%=basePath %>/patient/wxBindPage" class="right" style="color:#00abec">绑定</a>
    	 </div>
    </div>
	<span id="warn"></span>
    
    <form class="form-horizontal" id="myform">
    	<input type="hidden" id="redirectUrl" value="${redirectUrl}">
        <div class="form-group" id="sexRadioGroup">
       		 <label class="control-label" style="margin-right:13px;padding-top:0;">性别</label>
            <label class="radio-inline">
			  <input type="radio" style="position:static;" name="Sex" checked id="Sex1" value="1"><label  style="font-weight:normal;margin-right:14px;padding-left: 10px;" for="Sex1">男</label>
			</label>
			<label class="radio-inline">
			  <input type="radio" style="position:static;" name="Sex" id="Sex2" value="0"><label style="font-weight:normal;padding-left: 10px;" for="Sex2">女</label>
			</label>
       </div>
       
        <div class="form-group ">
            <label class="control-label" style="padding-top:0;padding-bottom:3px;" for="inputError1">姓名</label>
             <input  type="text" class="form-control {required:true,minlength:2,maxlength:20}" placeholder="请输入姓名" id="patientName" name="patientName">
        </div>
         
         <!-- 
        <div class="form-group ">
            <label class="control-label" style="padding-top:0;padding-bottom:3px;" for="inputError1">年龄</label>
              <input type="hidden" id="age" value="0">
              <input type="tel" placeholder="请输入年龄"  class="form-control {required:true,age:true}" id="age2" name="age2">
        </div>
         -->   
        
         <div class="form-group ">
          <label class="control-label" style="padding-top:0;padding-bottom:3px;" for="inputError1">身份证号码</label>	
          <input placeholder="请输入身份证号码" name="idcard" id="idcard" class="form-control {required:true,isIdCardNo:true}" type="text" maxlength="30">
        </div>
         
         
         <div class="form-group "  id="phoneNumGroup">
          <label class="control-label" style="padding-top:0;padding-bottom:3px;" for="inputError1">手机号码</label>
           <input maxlength="11" type="tel" placeholder="请输入手机号码"  class="form-control {required:true,mobile:true} " id="phoneNum" name="phoneNum">
        </div>

      
		<div id="" class="row" style="margin-bottom:15px;">
       		<label class="control-label" style="margin-left:15px;padding-top:0;padding-bottom:3px;" for="inputError1">验证码</label>
       		<div>
            	<div class="col-xs-8" style="padding-right:10px;">
               		<input maxlength="6" placeholder="请输入6位验证码" type="number" class="form-control {required:true,verifyCode:true}" id="verifyCode" name="verifyCode">
            	</div>
            	<div class="col-xs-4" style="padding-left:0;">
               	 	<a id="getVerifyCode" class="form-control btn-primary" style="text-decoration: none;text-align:center;font-size: 12px;padding-left:0;padding-right:0;margin-left:0;margin-right:0;background:#00abec;border: none;outline: none;cursor: pointer;padding-top:9px;color: white;text-shadow:none">获取验证码</a>
           		</div>
   		 	</div>
   		</div>

 		<div class="form-group ">
          <label class="control-label" style="padding-top:0;padding-bottom:3px;" for="inputError1">密码</label>	
           <input type="password" maxlength="15" placeholder="请输入6-15位密码"  class="form-control {required:true,passwd:true}" id="passWord" name="passWord">
        </div>
        
        <button id="signUpBtn" type="button" class="btn btn-primary btn-lg btn-block" style="border:none;outline:none;margin-bottom:10px;" >提交</button>
         <div>
        	<p style="text-align:center;margin-top:10px;margin-bottom:40px;">如果点击提交默认接受<a id="protocol" style="text-decoration: none;">《服务协议》</a></p>
        </div>
    </form>
</div>
<script>
$(function() {
	
})

</script>
<script src="static/js/patient/patientSignUp.js?timestamp=<%=randomNum%>"></script>
<script>
$("#protocol").click(function() {
<%-- 	window.open("<%=basePath %>/jsp/patient/registeProtocol.jsp","_self"); --%>
	window.open("<%=basePath %>/jsp/patient/userServiceAgreement.html","_self");
	return false;
})
</script>
</body>
</html>