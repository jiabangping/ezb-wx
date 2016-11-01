//初始化页面下拉加载更多插件
 	 refresher.init({
   	 	id: "wrapper",//<------------------------------------------------------------------------------------┐
   		 pullDownAction: Refresh,
   		 pullUpAction: Load
	});

	function Refresh() {
		wrapper.refresh();
	}

	//页面下拉加载更多
	function Load() {
		$("#dataLoad").show();
	   var pageIndex = $("#pageIndex").val()*1 +1;
		$("#pageIndex").val(pageIndex);
		var tel = "13991326043";
		var getSmsDataUrl = "api/v1/sms/query/"+$("#phoneNum").val().trim();
		 $.ajax({ 
  			url : getSmsDataUrl,
  			type : 'get',
  			cache : false,
  			dataType : 'json',
  			data:{"pageIndex":pageIndex},
  			success : function(data) { 
  				if(data.result == 'success') {
  					console.log(data);
  					showData(data.data);
  					wrapper.refresh();
  					$("#dataLoad").hide();
  				}else if(data.result == 'noData') {
  					$("#dataLoad").hide();
  					$("#alertContent").text("无更多数据");
  					showMaskAlert();
  				}else {
  					alert("获取数据失败");	
  				}
  			},
  			error : function(data) {
  				alert("获取数据失败");
  			}
  		});  
	     wrapper.refresh();
	}



	function getMySms() {
		var tel = "13991326043";
		var getSmsDataUrl = "api/v1/sms/query/"+$("#phoneNum").val().trim();
		 $.ajax({ 
  			url : getSmsDataUrl,
  			type : 'get',
  			cache : false,
  			dataType : 'json',
  			success : function(data) {
  				if(data.result == 'success') {
  					console.log(data);
  					showData(data.data);
  					$("#dataLoad").hide();
  				}else if(data.result == 'noData') {
  					$("#dataLoad").hide();
  					$("#alertContent").text("无更多数据");
  					showMaskAlert();
  				}
  				else {
  					alert("获取数据失败");	
  					$("#dataLoad").hide();
  				}
  			},
  			error : function(data) {
  				alert("获取数据失败");
  			}
  		});  
	}

	function showData(datas) {
		if(datas.length<=0) {
			$("#alertContent").text("无更多数据");
			showMaskAlert();
			return;
		}
		var e = '';
		for(var i=0;i<datas.length;i++) {
			e+=
			"<li><div class='row'>"+
				"<div class='col-xs-12' style='text-align: center;margin-bottom: 15px;padding-left: 5px;padding-right: 5px;'>"+
	    			"<span style='border: 2px solid #367998;border-radius:10px;display: block;width:90%;margin:0 auto;background-color: #ffffff;font-size: 16px;word-wrap:break-word;word-break:normal;overflow:hidden'>"+
	    			datas[i].noteContent+
	   			"</span>"+
				"</div>"+
			"</div></li>";
		}
		$("#page").append(e);
	}
	
	$("#dataLoad").show();
	
	 function hideMaskAlert() {
	        $("#maskAlert").hide();
    }
    function showMaskAlert() {
        $("#maskAlert").fadeIn("slow");
        $("#maskAlert").show();
        setTimeout(hideMaskAlert, 1500);
    }
    $(function () {
    	 // 关闭
        $(".close_btn").hover(
                function () {
                    $(this).css(
                            {
                                color: 'black'
                            }
                    )
                }
                , function () {
                    $(this).css(
                            {
                                color: '#999'
                            }
                    )
                }
        ).on('click', function () { 
                    $("#maskAlert").css(
                            {
                                display: 'none'
                            }
                    );
                }
        );
    	
    	
    	if( $("#phoneNum").val().trim() == '' || $("#phoneNum").val().trim().length <11 ) {
    	$("#dataLoad").hide();
			$("#alertContent").text("请使用手机号登录");
			showMaskAlert();
    		return;
    	}
    	getMySms();
    })