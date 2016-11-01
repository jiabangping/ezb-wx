
	$("#firstDataLoad").show();
	
	$("div.navbar-fixed-top").autoHidingNavbar();
	var casehistoryListUrl = "doctor/casehistoryList";
	
    function jump(a) {
       console.log($(a).find("input").val());
       // window.location.href=$(a).find("input").val();
    window.open($(a).find("input").val(),"_self");//,"_self"
   		return false;
    }

    function showData(datas,status) {//status=1为初次
    	 $("#dataLoad").hide();
    	if(datas.length<=0) {
    		//showNoDataAlertModal('无更多数据');
    	}
    	var content = '';
    	for(var i=0;i<datas.length;i++) {
    		content += 
    			 /*"<li>"+
    				"<div class='row'  style='border-bottom: 1px solid darkgray'>"+
    					"<div class='col-xs-12' style='margin-bottom: 0px;padding-left: 5px;padding-right: 5px;'>"+
    						"<div onclick='jump(this)' style='border: 1px solid white;border-radius:10px;display: block;width:90%;margin:0 auto;background-color: #ffffff;font-size: 16px;   word-wrap:break-word;word-break:normal;overflow:hidden'>"+
    							"<div><span style='font-size: 20px;font-weight: bold'>"+datas[i].title+"</span></div>"+
    							"<div>主持：<span>"+datas[i].masterName+"</span> <span>"+datas[i].deptName+"</span> 整理：<span>"+datas[i].arrangePerson+"</span></div>"+
    							"<div><span>"+datas[i].arrangeTimeStr+"</span></div>"+
    							"<input type='hidden' id='caseUrl' value='"+datas[i].caseUrl+"'>"+
    						"</div>"+
    					"</div>"+
    				"</div>"+
    			"</li>";*/
    			 "<li>"+
    				"<div class='row'>"+
    					"<div class='col-xs-12 content-row-wrap'>"+
    						"<div class='content-inner' onclick='jump(this)'>"+
    							"<div class='caseTitle'><span>"+datas[i].title+"</span></div>"+
    							"<div class='manage'>主持：<span style='margin-right: 25px;'>"+datas[i].masterName+"</span> 整理：<span>"+datas[i].arrangePerson+"</span></div>"+
    							"<div class='date'><span style='margin-right: 25px;'>"+datas[i].arrangeTimeStr+"</span><span>"+datas[i].deptName+"</span></div>"+
    							"<input type='hidden' id='caseUrl' value='"+datas[i].caseUrl+"'>"+
    						"</div>"+
    					"</div>"+
    				"</div>"+
    			"</li>";
    	}
    
    	$("#page").append(content);
    } 
    
    function initData() {
    	 $("#firstDataLoad").show();
    	 $.ajax({
             url : casehistoryListUrl,
             type : 'get',
             cache : false,
             dataType : 'json',
             data:{
            	 "departmentId":$("#departmentId").val(),
            	 "currentPage":$("#currentPage").val()
            },
             success : function(data) {
            	 $("#firstDataLoad").hide();
                 if(data.result == 'success') {
                     console.log(data);
                     showData(data.data,1);
                     
                 }else if(data.result == 'noData') {
                     //showNoDataAlertModal('无更多数据');
                 }else {
                	 showNoDataAlertModal('未获取到数据');
                 }
             },
             error : function(data) {
            	 $("#firstDataLoad").hide();
            	 showNoDataAlertModal('未获取到数据');
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
           	 "departmentId":$("#departmentId").val(),
           	 "currentPage":currentPage
           },
            success : function(data) {
            	$("#moreLoading").hide();
                if(data.result == 'success') {
                    console.log(data);
                    showData(data.data,0);
                }else if(data.result == 'noData') {
                    //showNoDataAlertModal('无更多数据');
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
	
	function showNoDataAlertModal2(msg) {
		$("#noDataAlertModalContent").text(msg);
		$('#noDataAlertModal').modal({backdrop: 'static', keyboard: false});
		$("#noDataAlertModal").modal("show");
	}
    
    $(function () {
    	$("#noDataAlertModal-btn").click(function() {
    		$("#noDataAlertModal").modal("hide");
    	})
    	$("#currentPage").val(1);
      	initData();
        
        initScrollEvent();

        function Refresh() {
            wrapper.refresh();
        }
        
        $("#searchBtn").click(function() {
        	
        })

    })