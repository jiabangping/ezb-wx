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
 
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport"
	content="width=device-width, initial-scale=1,user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">

<base href="<%=basePath %>">
<input type="hidden" id="basePath" value="<%=basePath %>" >
<link href="static/bootstrap-3.3.5-dist/css/bootstrap.min.css?timestamp=<%=randomNum%>" rel="stylesheet">
<script src="static/jquery-1.11.3/jquery-1.11.3.min.js?timestamp=<%=randomNum%>"></script>
<script src="static/jquery-1.11.3/jquery.md5.js?timestamp=<%=randomNum%>"></script>
<script src="static/layer/layer.js"></script>
<script src="static/bootstrap-3.3.5-dist/js/bootstrap.min.js?timestamp=<%=randomNum%>"></script>
<script src="static/js/common/common.js?timestamp=<%=randomNum%>"></script>






