 	$("div.navbar-fixed-top").autoHidingNavbar();
	var height=0;  
	var scr = 0 
	var result;
        
	//初始加载医生列表与下拉列表change时
      function firstShowOrders(data) {
    	  //isMyLaunch  == 0 我发起的 1不是我发起
    	  if(data.length<=0) {
    		  showNoDataAlertModal222("您当前没有订单");
    			return;
    		}
 		 var content = '';
 		 for(var i=0;i<data.length;i++) {//height:42px;
 			 var start = (data[i].avgScore) * 1;
 			 var start2 = "";
 			 var start1 = "";
 			 var timeStr = "";
 			var status = "";
    		if(2 == data[i].status) {//2待支付
    			/*status = "<div style='position: absolute;right: 16px;top:39px;' ><span style='display:inline-block;width:60px;height: 30px;text-align:center;line-height:30px;background: #1fbaf3;border-radius:3px;font-size: 15px;color: #ffffff'>支付</span></div>";*/
    		/*	status = "<div style='position: absolute;right: 16px;top:22px;' >"+
    				"<div style='display:inline-block;width:60px;height: 60px;text-align: center'>"+
    				   "<span style='margin-bottom:5px;display: block;width: 100%;font-size: 17px;color:#00abec;font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif'>&yen;<span style='margin-left: 3px;'>"+data[i].payAmt+"</span></span>"+
    					"<span style='width: 100%;line-height:30px;background: #1fbaf3;border-radius:3px;font-size: 15px;color: #ffffff;display: inline-block' id='payBtn'>支付<input type='hidden' id='orderId' value='"+data[i].orderID+"'></span>"+
    				"</div>"+
    			 "</div>";*/
    			status = "<div style='position: absolute;right: -11px;top:30px;' ><span style='display:inline-block;width:60px;height: 30px;text-align:center;line-height:30px;border-radius:3px;font-size: 15px;color: #666666'>待支付</span></div>";
    			timeStr += "<div>期望时间：<span id='begin'>"+data[i].planStartTimeStr+"</span>-<span id='end'>"+data[i].planEndTimeStr+"</span></div>";
    			
    		}else if(5 == data[i].status ) {//5：已完成
    			status = "<div style='position: absolute;right: -11px;top:30px;' ><span style='display:inline-block;width:60px;height: 30px;text-align:center;line-height:30px;border-radius:3px;font-size: 15px;color: #666666'>已完成</span></div>";
    			timeStr += "<div>截至时间：<span id='begin'></span><span id='end'>"+data[i].planEndTimeStr+"</span></div>";
    		}else if(3== data[i].status) {
    			status = "<div style='position: absolute;right: -11px;top:30px;' ><span style='display:inline-block;width:60px;height: 30px;text-align:center;line-height:30px;border-radius:3px;font-size: 15px;color: #666666'>会诊中</span></div>";
    			timeStr += "<div>截至时间：<span id='begin'></span><span id='end'>"+data[i].planEndTimeStr+"</span></div>";
    		}else if(0 == data[i].status) {
    			status = "<div style='position: absolute;right: -11px;top:30px;' ><span style='display:inline-block;width:60px;height: 30px;text-align:center;line-height:30px;border-radius:3px;font-size: 15px;color: #666666'>待确认</span></div>";
    			timeStr += "<div>期望时间：<span id='begin'>"+data[i].planStartTimeStr+"</span>-<span id='end'>"+data[i].planEndTimeStr+"</span></div>";
    		}else if(1 == data[i].status) {
    			status = "<div style='position: absolute;right: -11px;top:30px;' ><span style='display:inline-block;width:60px;height: 30px;text-align:center;line-height:30px;border-radius:3px;font-size: 15px;color: #666666'>待确认</span></div>";
    			timeStr += "<div>期望时间：<span id='begin'>"+data[i].planStartTimeStr+"</span>-<span id='end'>"+data[i].planEndTimeStr+"</span></div>";
    		}else if(4 == data[i].status) {
    			status = "<div style='position: absolute;right: -11px;top:30px;' ><span style='display:inline-block;width:60px;height: 30px;text-align:center;line-height:30px;border-radius:3px;font-size: 15px;color: #666666'>待评价</span></div>";
    			timeStr += "<div>截至时间：<span id='begin'></span><span id='end'>"+data[i].planEndTimeStr+"</span></div>";
    		}else if(-2 == data[i].status) {
    			status = "<div style='position: absolute;right: -11px;top:30px;' ><span style='display:inline-block;width:60px;height: 30px;text-align:center;line-height:30px;border-radius:3px;font-size: 15px;color: #666666'>被拒绝</span></div>";
    		}else {
    			//status = "<div style='position: absolute;right: -11px;top:30px;' ><span style='display:inline-block;width:60px;height: 30px;text-align:center;line-height:30px;border-radius:3px;font-size: 15px;color: #666666'>待确认</span></div>";
    		}
// for(var n=0;n<10;n++) {
    	 			
     		var isMyLaunch = "";//0是我发起，1:不是我发起
     		var img_src = "";
    		var _doctorName = "";
     		if(data[i].isMyLaunch == '0') {
     			isMyLaunch = "<div style='position: absolute;right: -15px;top:0px;' ><span style='display:inline-block;width:80px;height: 25px;text-align:center;line-height:25px;border-radius:3px;font-size: 12px;background:#caebf7;color: #666666;'>我发起的</span></div>";
     			
     			img_src = data[i].consultationDoctors[0].photo;
     			_doctorName = data[i].consultationDoctors[0].doctorName;
     		}else {
     			img_src = data[i].doctorInfo.photo;
     			_doctorName = data[i].doctorInfo.doctorName;
     		}
    		
 			 content += 
 			"<div class='form-group row_content' style='margin-top:10px;'>"+
 			"<input type='hidden' id='_doctorIdHidden' value='0' >"+
 			"<div class='col-xs-3 control-label' style='padding-left: 0'>"+
 				"<div class='auto_heightBox left' style='min-width: 91px;'> "+
 				  "<img class='inline_block' src='"+img_src+"' > "+
 				"</div>"+
 			"</div>"+
 			"<div class='col-xs-9' style='padding-left: 5px;'>"+
 				"<div class='auto_heightBox' style='min-width: 239px'>"+
 					"<div class='inline_block right' style='min-width: 234px;width:234px;height: 71px;overflow: hidden'>"+
 						"<div class='name'>"+_doctorName+"</div>"+
 						"<div class='secondRow'>会诊单号：<span id='orderId'>"+data[i].orderId+"</span>"+
 						"</div>"+
 						timeStr+status+isMyLaunch+
 					"</div>"+
 			   "</div>"+
 			"</div>"+
 		"</div>";
 		}
 //}
 		//$("#orders").html(content);
 		$("#orders").append(content);
		$("img").each(function() {
			 $(this).bind('load',function() {
			 })
			  $(this).bind('error',function() {
				  $(this).attr("src","static/img/defaultHead.jpg");
			 })
		});
 		 
 		if( ($("#orders")[0].scrollHeight) *1 <  (document.documentElement.clientHeight)*1) {
 			$("body").css({"height":"100%"})
 		}
 	 }  
      
      
      function showMoreOrders(data) {
    	  if(data.length<=0) {
    		  showNoDataAlertModal222("未获取到数据");
    			return;
    		}
 		 var content = '';
 		 for(var i=0;i<data.length;i++) {//height:42px;
 			 var start = (data[i].avgScore) * 1;
 			 var start2 = "";
 			 var start1 = "";
 			 var timeStr = "";
 			
 			var status = "";
    		if(2 == data[i].status) {//2待支付
    			status = "<div style='position: absolute;right: -11px;top:30px;' ><span style='display:inline-block;width:60px;height: 30px;text-align:center;line-height:30px;border-radius:3px;font-size: 15px;color: #666666'>待支付</span></div>";
    			timeStr += "<div>期望时间：<span id='begin'>"+data[i].planStartTimeStr+"</span>-<span id='end'>"+data[i].planEndTimeStr+"</span></div>";
    			
    		}else if(5 == data[i].status ) {//5：已完成
    			status = "<div style='position: absolute;right: -11px;top:30px;' ><span style='display:inline-block;width:60px;height: 30px;text-align:center;line-height:30px;border-radius:3px;font-size: 15px;color: #666666'>已完成</span></div>";
    			timeStr += "<div>截至时间：<span id='begin'></span><span id='end'>"+data[i].planEndTimeStr+"</span></div>";
    		}else if(3== data[i].status) {
    			status = "<div style='position: absolute;right: -11px;top:30px;' ><span style='display:inline-block;width:60px;height: 30px;text-align:center;line-height:30px;border-radius:3px;font-size: 15px;color: #666666'>会诊中</span></div>";
    			timeStr += "<div>截至时间：<span id='begin'></span><span id='end'>"+data[i].planEndTimeStr+"</span></div>";
    		}else if(0 == data[i].status) {
    			status = "<div style='position: absolute;right: -11px;top:30px;' ><span style='display:inline-block;width:60px;height: 30px;text-align:center;line-height:30px;border-radius:3px;font-size: 15px;color: #666666'>待确认</span></div>";
    			timeStr += "<div>期望时间：<span id='begin'>"+data[i].planStartTimeStr+"</span>-<span id='end'>"+data[i].planEndTimeStr+"</span></div>";
    		}else if(1 == data[i].status) {
    			status = "<div style='position: absolute;right: -11px;top:30px;' ><span style='display:inline-block;width:60px;height: 30px;text-align:center;line-height:30px;border-radius:3px;font-size: 15px;color: #666666'>待确认</span></div>";
    			timeStr += "<div>期望时间：<span id='begin'>"+data[i].planStartTimeStr+"</span>-<span id='end'>"+data[i].planEndTimeStr+"</span></div>";
    		}else if(4 == data[i].status) {
    			status = "<div style='position: absolute;right: -11px;top:30px;' ><span style='display:inline-block;width:60px;height: 30px;text-align:center;line-height:30px;border-radius:3px;font-size: 15px;color: #666666'>待评价</span></div>";
    			timeStr += "<div>截至时间：<span id='begin'></span><span id='end'>"+data[i].planEndTimeStr+"</span></div>";
    		}else if(-2 == data[i].status) {
    			status = "<div style='position: absolute;right: -11px;top:30px;' ><span style='display:inline-block;width:60px;height: 30px;text-align:center;line-height:30px;border-radius:3px;font-size: 15px;color: #666666'>被拒绝</span></div>";
    		}
    		
    	//	status = "<div style='position: absolute;right: -11px;top:30px;' ><span style='display:inline-block;width:60px;height: 30px;text-align:center;line-height:30px;border-radius:3px;font-size: 15px;color: #666666'>被拒绝</span></div>";
 			 
    		var isMyLaunch = "";//0是我发起，1:不是我发起
    		var img_src = "";
    		var _doctorName = "";
     		if(data[i].isMyLaunch == '0') {
     			isMyLaunch = "<div style='position: absolute;right: -15px;top:0px;' ><span style='display:inline-block;width:80px;height: 25px;text-align:center;line-height:25px;border-radius:3px;font-size: 12px;background:#caebf7;color: #666666;'>我发起的</span></div>";
     			
     			img_src = data[i].consultationDoctors[0].photo;
     			_doctorName = data[i].consultationDoctors[0].doctorName;
     		}else {
     			img_src = data[i].doctorInfo.photo;
     			_doctorName = data[i].doctorInfo.doctorName;
     		}
    		
 			 content += 
 			"<div class='form-group row_content' style='margin-top:10px;'>"+
 			"<input type='hidden' id='_doctorIdHidden' value='0' >"+
 			"<div class='col-xs-3 control-label' style='padding-left: 0'>"+
 				"<div class='auto_heightBox left' style='min-width: 91px;'> "+
 				
 				  "<img class='inline_block' src='"+img_src+"' > "+
 				"</div>"+
 			"</div>"+
 			"<div class='col-xs-9' style='padding-left: 5px;'>"+
 				"<div class='auto_heightBox' style='min-width: 239px'>"+
 					"<div class='inline_block right' style='min-width: 234px;width:234px;height: 71px;overflow: hidden'>"+
 						"<div class='name'>"+_doctorName+"</div>"+
 						"<div class='secondRow'>会诊单号：<span id='orderId'>"+data[i].orderId+"</span>"+
 						"</div>"+
 						"<div>截止时间：<span id='begin'>"+data[i].planStartTimeStr+"</span><span id='end'></span>"+
 						"</div>"+status+ isMyLaunch+
 					"</div>"+
 			   "</div>"+
 			"</div>"+
 		"</div>";
 		}
 	return content;
   }

	function hideNoDataAlertModal() {
		$("#noDataAlertModal").modal("hide");
	}
	
	function showNoDataAlertModal222(msg) {
		$("#noDataAlertModalContent").text(msg);
		$('#noDataAlertModal').modal({backdrop: 'static', keyboard: false});
		$("#noDataAlertModal").modal("show");
	}
	
	function showNoDataAlertModal(msg) {
		$("#noDataAlertModalContent").text(msg);
		$('#noDataAlertModal').modal({backdrop: 'static', keyboard: false});
		$("#noDataAlertModal").modal("show");
		setTimeout(hideNoDataAlertModal,1500);
	}
	
	function showNoData(msg) {
		$("#noDataAlertModalContent").text(msg);
		$('#noDataAlertModal').modal({backdrop: 'static', keyboard: false});
		$("#noDataAlertModal").modal("show");
	}
	
    $(function () {
    	$("#noDataAlertModal-btn").click(function() {
    		$("#noDataAlertModal").modal("hide");
    		WeixinJSBridge.call('closeWindow');
    	})

   	 	var range = 10;             //距下边界长度/单位px
        var num = 1;
        var totalheight = 0;
        var main = $("#content");                     //主体元素
        $(window).scroll(function(){
            var srollPos = $(window).scrollTop();    //滚动条距顶部距离(页面超出窗口的高度)
            totalheight = parseFloat($(window).height()) + parseFloat(srollPos);
            if(($(document).height()-range) <= totalheight) {
            	if($("#allDataLoad").val() * 1 == 1) {
            		return;
            	}
         		var curPage = $("#curPage").val()*1 + 1;
         		$("#curPage").val(curPage);
         		
         		var getOrdersUrl = "doctor/historyOrders";
         		$("#moreLoading").show();
         		 $.ajax({
         			url : getOrdersUrl,
         			type : 'get',
         			cache : false,
         			dataType : 'json',
         	    	 data : {
         	    	  "doctorId":$("#doctorId").val(),
    				  "token":$("#token").val(),
    				  "openId":$("#openId").val(),
         		      'currentPage' : curPage
         		     },
         			success : function(data) {
         				 $("#moreLoading").hide();
         				 console.log(data);
         				if(data.result == 'success') {
         					if(data.data.length<=0) {
         						$("#allDataFinish").val(1);
         						$("#allDataFinishAlert").show();
         						$("#allDataLoad").val(1);
         						setTimeout(function() {
         							$("#allDataFinishAlert").hide();
         						},1500);
         						return;
         					}
         					var childs = showMoreOrders(data.data);
         					$("#orders").append(childs);
         					
         					$("img").each(function() {
         			 			 $(this).bind('load',function() {
         			 			 })
         			 			  $(this).bind('error',function() {
         			 				  $(this).attr("src","static/img/defaultHead.jpg");
         			 			 })
         			 		 });
         					 
         				}else if(data.result == 'fail'){
         					//showNoDataAlertModal("无法获取到数据");
         				}
         			},
         			error : function(data) {
         				 $("#moreLoading").hide();
         				//showNoDataAlertModal("无法获取到数据");
         			}
         		});  
            }
        });
    	
    	
        
        $("#firstDataLoad").show();
		//初始化下拉菜单数据
		 $.ajax({
			url : 'doctor/historyOrders',
				type : 'get',
				data: {
					"doctorId":$("#doctorId").val(),
					"token":$("#token").val(),
					"openId":$("#openId").val()
				},
				cache : false,
				dataType : 'json',
				success : function(data) {
					$("#firstDataLoad").hide();
					//console.log(data);
					if (data.result == 'success') {
						if(data.data.length<=0) {
	                    	 showNoData('您当前没有订单');
	                    	 $("#allDataFinishAlert").hide();
	                    }
						firstShowOrders(data.data);
					} else if(data.result == 'fail'){
						//showNoDataAlertModal("无法获取到数据");
						 $("#firstDataLoad").hide();
						//$("#noDataAlertModalContent").text("无法获取到数据");
						//$('#noDataAlertModal').modal({backdrop: 'static', keyboard: false});
						//$("#noDataAlertModal").modal("show");
					}else if(data.result == "authFail") {
						 showNoData('认证失败，请重试');
					}
				},
				error : function(data) {
				}
			});

});