<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
	
<%@ include file="../common/common.jsp"%>  	
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<title>医生列表</title>
<%@ include file="../common/noCache.jsp"%> 
<link rel="stylesheet" href="static/bootstrap-submenu-2.0.4-dist/css/bootstrap-submenu.min.css?timestamp=<%=randomNum%>">
<link rel="stylesheet" href="static/pullToRefresh/reset.css?timestamp=<%=randomNum%>" />
<link rel="stylesheet" href="static/pullToRefresh/pullToRefresh.css?timestamp=<%=randomNum%>" />
<link rel="Stylesheet" type="text/css" href="static/css/common/alertDialog.css?timestamp=<%=randomNum%>"/> 
<link rel="Stylesheet" type="text/css" href="static/css/doctor/doctorsPage.css?timestamp=<%=randomNum%>"/>
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />

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
		.deparmentChild{
		
			height:300px;overflow:scroll;position:fixed;top:40px;left:52%;
		}
		.hospitalChild{
			height:300px;overflow:scroll;position:fixed;top:40px;left:18%;
		}
	}
	
	@media screen and (mix-width: 600px) { /*当屏幕尺寸大于600px时，应用下面的CSS样式*/
		/* .deparmentChild{
		height:300px;overflow:scroll;position:fixed;top:40px;left:4%;
		} */
	}
</style>
</head>


<!-- 模态框（Modal）下边单按钮 -->
<div class="modal fade" id="noDataAlertModal" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="false">
    <div class="modal-dialog" style="top:75px">
        <div class="modal-content">
            <div id="noDataAlertModalContent" class="modal-body" style="font-size: 15px;text-align: center;color:#333333;">
               	暂无更多数据
            </div>
            <div class="modal-footer" style="padding:0">
               <form class="form-horizontal"  style="">
					  <div class='col-xs-12' style="text-align:center;padding:0;border-right:1px solid #E5E5E5">
 		             	<div id="noDataAlertModal-btn" class="btn-lg btn-block" style="font-size:16px;color:#3C95FE;margin-top: 2px;margin-bottom: 2px;cursor:point">确定</div>
 		              </div>
				</form>
            </div>
        </div>
    </div>
</div>
<body style="height:auto;background:#EEEEEE">
	<input type="hidden" id="curPage">	
	
	<div class="container top" style="background: #EEEEEE;">
		<!-- 下拉列表開始 -->
		<div class="row navbar-fixed-top" style="background: #ffffff;"><!-- navbar-fixed-top此属性导致fixed 下拉列表多余的出不来 -->
			<div class="col-xs-4 topNavBar"
				style="border-right: 1px solid #ddd">
				<div class="btn-group">
					<ul class="nav nav-pills">
						<li class="dropdown" style="height: 32px; line-height: 32px;">
							<a id="610000" class="province" tabindex="0" data-toggle="dropdown"
							data-submenu="" aria-expanded="false"
							style="height: 32px; padding-top: 0; padding-bottom: 0; padding-left: 10px; padding-right: 10px; color: #000000">
								西安市 <span class="caret"></span>
						</a>
							<!-- <ul class="dropdown-menu" id="provinceChild" style="height:300px;overflow:scroll;">
							<ul style="margin-left:18px">
							<li><a style="color:black;text-decoration: none" id='610100'>全部地区</a></li><li class='divider'></li>
							</ul>
							</ul> -->
						</li>
					</ul>
				</div>
			</div>

			<div class="col-xs-4 topNavBar"
				style="border-right: 1px solid #ddd">
					<div class="btn-group">
					<button  type="button"
						class="btn btn-default dropdown-toggle" data-toggle="dropdown"
						style="border: none;height:32px;line-height:32px;padding:0 0;top:5px;" id="" >
						<span id="10" data-flag="hospitals" style="display:inline-block;width:60px;text-overflow:ellipsis;">西京医院</span>
					</button>
					 <span class="caret" style=""></span>
					
					<!-- <ul class="dropdown-menu hospitalChild" role="menu" data-flag="hospitalChild">
						<li><a  id='-1'>全部医院</a></li>
						<li class='divider'></li>
					</ul> -->
				</div>
			</div>

			<div class="col-xs-4 topNavBar">
					<div class="btn-group">
					<button  id="" type="button"
						class="btn btn-default dropdown-toggle" data-toggle="dropdown"
						style="border: none;height:32px;line-height:32px;padding:0 0;top:5px;" id="dept">
						<span data-flag='deparments' style="display:inline-block;margin:0;padding:0;width:60px;text-overflow:ellipsis;" id="192">心血管外科 </span> <!-- id:192 -->
						
					</button>
					<span class="caret"></span>
					
					<ul class="dropdown-menu deparmentChild" role="menu" data-flag="deparmentChild"
						id="" ><!-- style="height:300px;overflow:scroll;position:fixed;top:40px;left:4%;" -->
						<!-- <li><a id='-1'>全部科室</a></li>
						<li class='divider'></li> -->
					</ul>
				</div>
			</div>
		</div>

		<!-- 医生列表内容-->
		<div class="content" style="margin-top:50px;">
			<form class="form-horizontal" id="doctors" style="">
				<!-- <ul id="doctors">
				</ul> -->
			</form>
		</div>
	</div>
    <div id="maskAlert" class="container">
            <div class="col-xs-12 pos" style="position:fixed">
                <div class="body" id="maskAlert" style="display:inline-block;background-image:url(static/img/bg.png)">
                    <div class="head">
                        <span id="alertTitle" class="title">提示</span>
                        <a id="alertCloseBtn" href="javascript:void(0)" title="关闭窗口" class="close_btn" style="text-decoration: none">×</a>
                    </div>
                    <span id="alertContent" class="alertContent">获取医生列表失败</span>
                </div>
            </div>
    </div>

<!-- 正在加载中 -->
<div id="firstDataLoad" class="container" style="display: none">
            <div class="col-xs-12 pos" style="position:fixed">
                <div  style="display:inline-block;width: 200px;height: 100px;display:inline-block;position: relative;border-radius: 4px;">
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

	<input id="allDataFinish" type='hidden' value="0">
	  <!-- 尾部载中 -->
		<div id="allDataFinishAlert" class="container" style="display: none">
	            <div class="col-xs-12 pos2" style="">
	                <div  style="width: 100%;height: 44px;line-height:44px;display:inline-block;position: relative;	background:white;border-top:1px solid #dddddd">
	                    <div class="">
	                    	<span id="allDataFinishAlertContent" class="" style="color:#999999">已经全部加载完毕</span>
	                    </div>
	                </div>
	            </div>
	    </div>

	
</body>
<script src="static/pullToRefresh/iscroll.js?timestamp=<%=randomNum%>"></script>
<script src="static/pullToRefresh/pullToRefresh.js?timestamp=<%=randomNum%>"></script>
<script src="static/autohidingnavbar/jquery.bootstrap-autohidingnavbar.min.js?timestamp=<%=randomNum%>"></script>
<script
src="static/bootstrap-submenu-2.0.4-dist/js/bootstrap-submenu.min.js?timestamp=<%=randomNum%>"
		defer></script>
<script src="static/js/doctor/doctorsPage.js?timestamp=<%=randomNum%>"></script>
</html>