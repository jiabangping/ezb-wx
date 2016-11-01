<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String nickName = (String)session.getAttribute("nickName");
%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ include file="../common/noCache.jsp"%> 
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport"
	content="width=device-width, initial-scale=1,user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">

<base href="<%=basePath %>">
<link href="static/bootstrap-3.3.5-dist/css/bootstrap.min.css?timestamp=<%=randomNum%>" rel="stylesheet">

<script src="static/jquery-1.11.3/jquery-1.11.3.min.js?timestamp=<%=randomNum%>"></script>
<script src="static/bootstrap-3.3.5-dist/js/bootstrap.min.js?timestamp=<%=randomNum%>"></script>
    <title>患者注册协议</title>
   <!--  <link href="../apiweb/css/bootstrap.min.css" rel="stylesheet">
    <link href="../apiweb/stickup.css" rel="stylesheet">     -->
	<style type="text/css">
		.imgstyle{
			height:60%;
			width:60%;
			clear: both; 
			display: block; 
			margin:auto; 
			border:1px solid #cecece;
			margin-bottom:10px;
		}
	</style>
	
  </head>
  <body>
  
      
  <div class="container">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <h4 class="text-center">患者注册协议</h4>
                <!-- <h5 class="text-center">远程会诊咨询合作框架协议书</h5> -->
            </div>
            <div class="panel-body">
                <ul class="list-group">
                    <!-- <li class="list-group-item">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;为了响应«国家卫生计生委关于推进医疗机构远程医疗服务的意见»（国卫医发[2014]51号）的精神，优化医疗资源配置，实现优质医疗资源面向基层，面向农村，进一步落实“分级诊疗”制度，使优质的医疗资源结合先进的移动互联移动终端技术更好的服务广大医患者，在遵守国家法律法规政策的前提下，本着公平公正、互惠互利的原则，通过充分协商，双方就使用移动互联网远程医疗服务平台开展远程会诊咨询业务事宜达成以下框架协议：
                    </li> -->
                    <li class="list-group-item">
                        <h4 class="media-heading">一、总则</h4>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.本协议是您与e会诊客户端（简称“本客户端”）所有者（以下简称“e会诊”）之间就e会诊客户端服务等相关事宜所订立的。请您仔细阅读本注册协议，您点击“注册”按钮后，本协议即构成双方有约束力的法律条件。<br>
   						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.本协议用于规范客户端和客户端的使用者（包括但不限于患者用户及其家属、医生用户等，以下简称“您”）之间的行为和关系，为您提供客户端服务。<br>
   						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.e会诊为您提供全面的医疗健康服务，为充分保护您对于本客户端提供的各项服务的知情权，客户端就其提供的各项服务的相关性、有效性以及限制性提供以下注册条款。客户端在此特别提醒您，在您使用注册前已确实仔细阅读并充分理解了本协议，如果您对本协议的任何条款或者将来随时可能修改、补充的条款有异议，您可选择不注册成为本客户端的用户。<br></li>
                    <li class="list-group-item">
                        <h4 class="media-heading">二、本协议的确认和接纳</h4>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.本客户端的各项电子服务的所有权和运作权归e会诊所有。用户同意所有注册协议条款并完成注册程序，才能成为本客户端的正式用户。用户确认：本协议条款是处理双方权利义务的契约，始终有效，法律另有强制性规定或双方另有特别约定的，依其规定。 <br>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.用户点击同意本协议的，即视为用户确认自己具有享受本客户端服务的权利，能够独立承担法律责任。
                    </li>
                    <li class="list-group-item">
                        <h4 class="media-heading">三、服务简介</h4>
                        <ol>
                            <li>e会诊通过互联网依法为用户提供互联网信息等服务，用户在完全同意本协议及本客户端规定的情况下，方有权使用本客户端的相关服务。</li>
                            <li>用户必须自行准备如下设备和承担如下开支：<br>
                                                                                    （1）上网设备，包括并不限于电脑或者其他上网终端，调制解调器及其他必备的上网装置；<br>
							（2）上网开支，包括并不限于网络接入费，手机流量费等。</li>
                            <li>您应保证：提供详尽、真实、准确和完整的个人资料。如果资料发生变动，您应及时更改。若您提供任何错误、不实、过时或不完整的资料，并为本客户端所确知；或者本客户端有合理理由怀疑前述资料为错误、不实、过时或不完整的资料，本客户端有权暂停或终止您的帐号，并拒绝现在或将来使用本服务的全部或一部分。</li>
                        </ol>
                    </li>
                    <li class="list-group-item">
                        <h4 class="media-heading">四、协议修改</h4>
                            	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本客户端有权在必要时修改本协议条款，协议条款一旦发生变动，届时将在您界面提示修改内容，该提示行为视为客户端已经通知您修改内容，如果您不同意所作的修改，可以主动取消获得的服务，进行注销。如果您继续享有本客户端提供的服务，则被视为接受协议变动。当发生有关争议时，以最新的服务协议为准。
                          
                    </li>
                    <li class="list-group-item">
                        <h4 class="media-heading">五、您的帐号、密码和安全性 </h4>
                        <ol>
                            <li>您一旦注册成功，成为本客户端的合法用户，将得到一个您的帐号和密码。您的帐号和密码由您负责保管。您都要对任何以您帐号进行的所有活动和事件负全责，且您有权随时根据指示更改您的密码。若发现任何非法使用您的帐号或存在安全漏洞的情况，请立即通知客服。因黑客行为或您的保管疏忽等情况导致帐号、密码遭他人非法使用，本客户端不承担责任。</li>
                            <li>为向您提供本客户端服务，您同意并授权本客户端将您在注册、使用服务过程中提供、形成的信息传递给向您提供其他服务的客户端及关联公司或其他组织，或从提供其他服务的客户端关联公司或其他组织获取您在注册、使用其他服务期间提供、形成的信息。网站将根据法律法规的要求，履行其作为互联网信息服务提供者应当履行的义务。</li>
                        </ol>
                    </li>
                    <li class="list-group-item">
                        <h4 class="media-heading">六、隐私保护 </h4>
                      		 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;保护您隐私是本客户端的一项基本政策，保证不对外公开或向第三方提供您的注册资料及您在使用本客户端服务时存储在网站的非公开内容，但下列情况除外： <br>
                        	 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（1）事先获得您的明确授权；<br>
  							 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（2）根据有关的法律法规要求；<br>
  							 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（3）为维护本客户端的合法权益。<br>
                    </li>
                    <li class="list-group-item">
                        <h4 class="media-heading">七、法律</h4>
                        <ol>
                            <li>本协议之效力、解释、执行和争议的解决均适用中华人民共和国之法律。如本协议之任何一部分与中华人民共和国法律相抵触，则该部分条款应按有关法律规定重新解释，部分条款之无效或重新解释不影响其它条款之法律效力。</li>
                            <li>您和本客户端运营方一致同意凡因本协议所产生的纠纷双方应协商解决，协商不成任何一方可提交客户端所有人所在地法院诉讼裁决。</li>
                        </ol>
                    </li>
                </ul>
            </div>
        </div>
          <button id="returnBtn" type="button" class="btn btn-success btn-lg btn-block" style="margin-bottom:20px;" >关闭</button>
	</div>

    <!-- Bootstrap & Plugins core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
   <!--  <script src="../apiweb/js/jquery.js"></script>
    <script src="../apiweb/js/bootstrap.min.js"></script> -->

    <!-- ### IMPORTANT ### stickUp javascript file -->
    <!-- ######################################### --> 
    <!-- <script src="../apiweb/js/stickUp.min.js"></script> -->
    <!-- ######################################### -->
  
  <script>
	$("#returnBtn").click(function() {
		window.history.back(-1);
	})
	</script>
  </body>
</html>
