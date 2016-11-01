<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ page import="java.util.Date" %> 
<%-- <%@ page import="com.ezhuanbing.api.conf.ServerConfigConst" %> --%>

<%!
//String randomNum = ServerConfigConst.staticRsVersion;
//String randomNum = ServerConfigConst.getVersion();
String randomNum = String.valueOf(new Date().getTime());
%>
<%
response.setHeader("Pragma","No-cache"); 
response.setHeader("Cache-Control","no-cache"); 
response.setDateHeader("Expires", 0); 
%>

<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />

