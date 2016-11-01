
	$("#firstDataLoad").show();
	
/*	$("div.navbar-fixed-top").autoHidingNavbar();*/
	var casehistoryListUrl = "patient/myConsultationData";
	
   

    function showData(datas,status) {//status=1为初次
    	if(datas.length<=0) {
    		//showNoDataAlertModal('无更多数据');
    		//$("#noDataContent").text("暂无数据");
    		/*$('#noDataModal').modal({backdrop: 'static', keyboard: false});
    		$("#noDataModal").modal("show");*/
    //		showNoDataAlertModal2222("暂无数据");
    	}
    	var content = '';
    	for(var i=0;i<datas.length;i++) {
    		var status = "";
    		if(2 == datas[i].status) {//2待支付
    			/*status = "<div style='position: absolute;right: 16px;top:39px;' ><span style='display:inline-block;width:60px;height: 30px;text-align:center;line-height:30px;background: #1fbaf3;border-radius:3px;font-size: 15px;color: #ffffff'>支付</span></div>";*/
    			status = "<div style='position: absolute;right: 16px;top:22px;' >"+
    				"<div style='display:inline-block;width:60px;height: 60px;text-align: center'>"+
    				   "<span style='margin-bottom:5px;display: block;width: 100%;font-size: 17px;color:#00abec;font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif'>&yen;<span style='margin-left: 3px;'>"+datas[i].payAmt+"</span></span>"+
    					"<span style='width: 100%;line-height:30px;background: #1fbaf3;border-radius:3px;font-size: 15px;color: #ffffff;display: inline-block' id='payBtn'>支付<input type='hidden' id='orderId' value='"+datas[i].orderID+"'></span>"+
    				"</div>"+
    			 "</div>";
    		}else if(5 == datas[i].status ) {//5：已完成
    			status = "<div style='position: absolute;right: 16px;top:39px;' ><span style='display:inline-block;width:60px;height: 30px;text-align:center;line-height:30px;border-radius:3px;font-size: 15px;color: #666666'>已完成</span></div>";
    		}else if(3== datas[i].status) {
    			status = "<div style='position: absolute;right: 16px;top:39px;' ><span style='display:inline-block;width:60px;height: 30px;text-align:center;line-height:30px;border-radius:3px;font-size: 15px;color: #666666'>会诊中</span></div>";
    		}else if(0 == datas[i].status) {
    			status = "<div style='position: absolute;right: 16px;top:39px;' ><span style='display:inline-block;width:60px;height: 30px;text-align:center;line-height:30px;border-radius:3px;font-size: 15px;color: #666666'>待确认</span></div>";
    		}else if(1 == datas[i].status) {
    			status = "<div style='position: absolute;right: 16px;top:39px;' ><span style='display:inline-block;width:60px;height: 30px;text-align:center;line-height:30px;border-radius:3px;font-size: 15px;color: #666666'>待确认</span></div>";
    		}else if(4 == datas[i].status) {
    			status = "<div style='position: absolute;right: 16px;top:39px;' ><span style='display:inline-block;width:60px;height: 30px;text-align:center;line-height:30px;border-radius:3px;font-size: 15px;color: #666666'>待评价</span></div>";
    		}else if(-2 == datas[i].status) {
    			status = "<div style='position: absolute;right: 16px;top:39px;' ><span style='display:inline-block;width:60px;height: 30px;text-align:center;line-height:30px;border-radius:3px;font-size: 15px;color: #666666'>被拒绝</span></div>";
    		}
    		
    		content += 
    	"<li>"+
            "<div class='row' >"+
                "<div class='col-xs-12 content-row-wrap' style='position: relative'>"+
                    "<div class='content-inner'>"+
                        "<div class='caseTitle'><span>"+datas[i].inDateStr+"</span></div>"+
                        "<div style='margin-bottom: 2px'><span style='font-size: 15px;color: #666666'>单号：</span><span class='manage' style='margin-right: 25px;'>"+datas[i].orderID+"</span></div>"+
                        "<div style='height:21px;width:300px;overflow:hidden;margin-bottom:2px;font-size: 15px;color: #666666;'><span>主治：</span><span style='margin-right: 10px;'>"+datas[i].doctorName+"</span><span >"+datas[i].doctorHospitalName+"</span></div>"+
                        "<div style='height:21px;width:300px;overflow:hidden;font-size: 15px;color: #666666'><span>会诊：</span><span  style='margin-right: 10px;'>"+datas[i].expertName+"</span><span>"+datas[i].expertHospitalName+"</span></div>"+
                        status +
                    "</div>"+
                "</div>"+
            "</div>"+
        "</li>";
    	}
    
    	$("#page").append(content);
    	$("#payBtn").on('touchend',function(e){// 改变了事件名称，tap是在body上才被触发，而touchend是原生的事件，在dom本身上就会被捕获触发
            //$demo.hide()
            console.log($(this).find('input').val());
            window.location.href=$("#payApiUrl").val()+$(this).find('input').val();
            e.preventDefault();//阻止“默认行为”
        })
    } 
    
    function initData() {
    	 $("#firstDataLoad").show();
    	 $.ajax({
             url : casehistoryListUrl,
             type : 'get',
             cache : false,
             dataType : 'json',
             data:{
            	 "phoneNum":$("#phoneNum").val(),
            	 "currentPage":$("#currentPage").val()
            },
             success : function(data) {
            	 $("#firstDataLoad").hide();
                 if(data.result == 'success') {
                     console.log(data);
                     if(data.data.length<=0) {
                    	 showNoDataAlertModal2222('您当前没有订单');
                    	 $("#allDataFinishAlert").hide();
                     }
                     showData(data.data,1);
                 }else if(data.result == 'noData') {
                     //showNoDataAlertModal('无更多数据');
                	 showNoDataAlertModal2222('您当前没有订单');
                	 $("#allDataFinishAlert").hide();
                 }else {
                	 //showNoDataAlertModal('未获取到数据');
                	 showNoDataAlertModal2222('您当前没有订单');
                	 $("#allDataFinishAlert").hide();
                 }
             },
             error : function(data) {
            	 $("#firstDataLoad").hide();
            	 //showNoDataAlertModal('未获取到数据');
            	 showNoDataAlertModal2222('未获取到数据');
            	 $("#allDataFinishAlert").hide();
             }
         });
    }
    
    function initScrollEvent() {
    	var range = 10;             //距下边界长度/单位px
        var num = 1;
        var totalheight = 0;
        var main = $("#content");                     //主体元素
        $(window).scroll(function(){
            var srollPos = $(window).scrollTop();    //滚动条距顶部距离(页面超出窗口的高度)
            totalheight = parseFloat($(window).height()) + parseFloat(srollPos);
            if(($(document).height()-range) <= totalheight) {
            	/*if($("#allDataFinish").val()== 1 || 	$("#allDataFinish").val(1) == '1') {
            		return;
            	}*/
            	$("#moreLoading").show();
            	Load();
            }
        });
    }
    
    //页面下拉加载更多
    function Load() {
    	var currentPage = $("#currentPage").val()*1+1;
    	$("#currentPage").val(currentPage);
   	 	$.ajax({
            url : casehistoryListUrl,
            type : 'get',
            cache : false,
            dataType : 'json',
            data:{
            	"phoneNum":$("#phoneNum").val(),
           	 "currentPage":$("#currentPage").val()
           },
            success : function(data) {
            	$("#moreLoading").hide();
                if(data.result == 'success') {
                    console.log(data);
                    if(data.data.length <=0) {
                    	$("#allDataFinish").val(1);
                    	$("#allDataFinishAlert").show();
                    	return;
                    }
                    
                    showData(data.data,0);
                }else if(data.result == 'noData') {
                    showNoDataAlertModal('无更多数据');
                }else {
                	 showNoDataAlertModal('未获取到数据');
                }
            },
            error : function(data) {
            	$("#moreLoading").hide();
            	 showNoDataAlertModal('未获取到数据');
            }
        });
    }
    
    function hideNoDataAlertModal() {
		$("#noDataAlertModal").modal("hide");
	}
	function showNoDataAlertModal(msg) {
		$("#noDataAlertModalContent").text(msg);
		$('#noDataAlertModal').modal({backdrop: 'static', keyboard: false});
		$("#noDataAlertModal").modal("show");
		setTimeout(hideNoDataAlertModal,1500);
	}
	function showNoDataAlertModal2222(msg) {
		$("#noDataAlertModalContent").text(msg);
		$('#noDataAlertModal').modal({backdrop: 'static', keyboard: false});
		$("#noDataAlertModal").modal("show");
	}
    
    $(function () {
    	$("#noDataAlertModal-btn").click(function() {
    		$("#noDataAlertModal").modal("hide");
    		WeixinJSBridge.call('closeWindow');
    	})
    	
      	initData();
        
        initScrollEvent();

        function Refresh() {
            wrapper.refresh();
        }
        
        $("#searchBtn").click(function() {
        	
        })

    })