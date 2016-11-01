<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%
Object avgScore = request.getAttribute("avgScore");
Integer avgScoreNum = 0;
if(avgScore != null) {
	avgScoreNum = (Integer)avgScore;
}
%>
<%@ include file="../common/common.jsp"%>  	
<%@ include file="../common/noCache.jsp"%> 
<title>医生详细</title>

<link rel="Stylesheet" type="text/css" href="static/css/common/alertDialog.css?timestamp=<%=randomNum%>"/> 
<link rel="Stylesheet" type="text/css" href="static/css/doctor/doctorDetail.css?timestamp=<%=randomNum%>"/>
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />

</head>
<body >
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
<div class="container top">
	<%-- <div class="row" style="margin-bottom:-5px;margin-top:5px;">
    	 <div class="col-xs-12" style="text-align:center;font-size:20px;">${doctorName}医生简介
    	  <a href="doctor/signUpPage?protocolConfirm=1" style="inline-block;left:15px;position:absolute;text-decoration:none;color:black;font-size:15px;top:5px;">返回</a> 
    	 </div>
    </div> --%>
	

    <!-- 医生列表内容-->
    <div class="content" style="color:#666666">
    <input type="hidden" id="doctorId" value="${doctorId}">
    <input type="hidden" id="loginName" value="${loginName}">
    <input type="hidden" id="baseZhuanBingApiUrl" value="${baseZhuanBingApiUrl}">
        <form class="form-horizontal" id="doctors">
        
            <div class='form-group row_content'>
            	<div class="row">
	                <div class='col-xs-3 control-label' style='/* padding-left: 0 */'>
	                    <div class='auto_heightBox left' style='min-width: 91px;'>
	                        <img class='inline_block' src='${photo}' >
	                    </div>
	                </div>
	                <div class='col-xs-9' style='padding-left: 5px;'>
	                    <div class='auto_heightBox' style='min-width: 239px'>
	                        <div class='inline_block right' style='min-width: 234px;width:234px;height: 71px;overflow: hidden'>
	                            <div class='name'>${doctorName}</div>
	                            <div class='secondRow'>
	                            	<span>${departmentName}</span>
	                            	<span style='margin-left: 5px;margin-right: 5px;'>|</span>
	                            	<span>${positionName}</span>
	                            </div>
	                            <div>${hospitalName}</div>
	                        </div>
	                    </div>
	                </div>
				</div>	                
               <div class="row">
	              	<div class="col-xs-12 chartBox" style="position:relative">
	              	 	<img src="static/img/chart-bg.png" style="width:96%;margin-left:2%;height:76px;margin-bottom:15px;">
	              		<div style="position:absolute;top:21%;left:8%;">
	              			<p style="color:#00abec">关注成功后：<p>
	              			<p>我将成为您的随诊医生，并对您的情况作出更准确的评估。
	              		</div>
	              	</div>
               </div>
                
            </div>
            <%--
            <div class="orderAndEvaluateCount">
            	已会诊
            	<span class="orderCount">${orderCount}</span>
                <span class="evaluateCount">已评价
                	<span>${evaluateCount}</span>
                </span>
            </div>

            <div class="startRow">
                <div class='star'>
	               <%for(int i=0;i<avgScoreNum;i++) {%>
	            	   <li><img src='static/img/star-36-2.png'></li>
	               <%}
	               for(int i=0;i<(5-avgScoreNum);i++) {
	                %>
	            	   <li><img src='static/img/star-36-1.png'></li>
	               <%}%>
                    <li class="startNum">${avgScore}.0<span style="margin-left:3px;font-size: 16px">分</span></li>
                </div>
            </div>
             --%>
            <div class="skilledFieldTitle" style="color:#333333;font-weight:bold">擅长病种</div>
           	<div class="skilledField" style="color:#666666">${skilledField}</div>
            <div class="descriptionTitle" style="color:#333333;font-weight:bold">医生简介</div>
            <div class="description" style="color:#666666;text-indent:2em">${description}</div>
            
           <button id="subscribe" type="button" class="btn btn-primary btn-lg btn-block" style="border:none;outline:none;margin-bottom:20px;background: #00abec;margin-top:20px;">立即关注</button>
        </form>
    </div>
</div>

<!-- 正在加载中 -->
<div id="firstDataLoad" class="container" style="display: none">
    <div class="col-xs-12 pos" style="position:fixed">
        <div  style="display:inline-block;width: 200px;height: 100px;display:inline-block;position: relative;border-radius: 4px;padding-top: 21px;background: white;">
            <div class="">
                <img src="static/img/refresh.gif"  />
            </div>
            <span id="" class="" style="color:#999999">数据载入中，请稍后......</span>
        </div>
    </div>
</div>
<!-- 正在加载中 -->


<!-- 尾部载中 -->
<div id="moreLoading" class="container" style="display: none">
    <div class="col-xs-12 pos2" style="">
        <div  style="width: 100%;height: 44px;line-height:44px;display:inline-block;position: relative;	background:white;border-top:1px solid #dddddd">
            <div class="">
                <img src="static/img/refresh.gif" style="width: 21px;height: 21px" />
                <span id="" class="" style="color:#999999">载入中...</span>
            </div>
        </div>
    </div>
</div>
<!-- 正在加载中 -->


</body>
<script type="text/javascript">
	$(function() {
		$("img").each(function() {
			 $(this).bind('load',function() {
			 })
			  $(this).bind('error',function() {
				  $(this).attr("src","static/img/defaultHead.jpg");
			 })
		 });
		$("#subscribe").click(function() {
				$("#dataSubmit").show();
				var bindUrl = $("#baseZhuanBingApiUrl").val()+"/api/v1/patient/wx/"+$("#loginName").val()+"/doctor/"+$("#doctorId").val()
				 $.ajax({
			  			url : bindUrl,
			  			type : 'post',
			  			cache : false,
			  			contentType: "application/json",
			  			dataType : 'json',
		  			 	data : JSON.stringify({
			     	     }),
			  			success : function(data) {
			  				$("#dataSubmit").hide();
			  				if(data.result == 'success') {
			  					window.location.href= $("#basePath").val()+ "/jsp/patient/subscribeSuccessPage.jsp";
			  					//showMaskAlert();
			  				}else if("openInWeixinPlease" == data.result) {
			  					layer.alert("请在微信中打开");
			  				}else if(data.result == 'exist') {
			  					layer.alert("用户已存在");
			  				}else if(data.result == 'fail') {
			  					layer.alert("关注失败");
			  				}else if(data.result == 'verifyError') {
			  					layer.alert("验证码错误");
			  				}
			  			},
			  			error : function(data) {
			  				$("#dataSubmit").hide();
			  				layer.alert("关注失败");
			  			}
			  		});  
			
		})
	})
</script>

</html>