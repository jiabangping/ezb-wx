 $("div.navbar-fixed-top").autoHidingNavbar();
	var height=0;  
	var scr = 0 
	var result;
        
      //页面下加载更多数据时调用此方法
      function showDoctors(data) {
    	  if(data.length<=0) {
    		//showNoDataAlertModal("无更多数据");
  			return;
  		}
   		 var content = '';
   		 for(var i=0;i<data.length;i++) {//height:42px;
   			 var start = (data[i].avgScore) * 1;
 			 var start2 = "";
 			 var start1 = "";
 			 for(var x=0;x<start;x++) {
 				start2 +=  "<li><img src='static/img/star-24-2.png'></li>";
 			 }
 			 for(var x=0;x< (5-start);x++) {
 				start1 +=  "<li><img src='static/img/star-24-1.png'></li>";
 			 }
 			var allStart = ""+start2 + start1;
 			var photoUrl = "static/img/defaultHead.jpg";
 			/*$.ajax(data[i].photo, {
 	            type: 'get',
 	            timeout: 1000,
 	            success: function() {
 	            	photoUrl = data[i].photo;
 	            	console.log("success");
 	            },
 	            error: function() {
 	               // alert("请求失败");
 	            }
 	        });*/
 			
   			 content += 
   				"<div class='form-group row_content' onclick='jumpDetailPage(this)' >"+
   				"<input type='hidden' id='_doctorIdHidden' value="+data[i].id+" >"+
                "<div class='col-xs-3 control-label' style='padding-left: 0'>"+
                    "<div class='auto_heightBox left' style='min-width: 91px;'>" +
                       "<img class='inline_block'  src='"+data[i].photo+"' >" +
                    "</div>"+
                "</div>"+
                "<div class='col-xs-9' style='padding-left: 5px;'>"+
                    "<div class='auto_heightBox' style='min-width: 239px'>"+
                        "<div class='inline_block right' style='min-width: 234px;width:234px;height: 71px;overflow: hidden'>"+
                          /*  "<div class='star'>"+
                            allStart +
                            "</div>"+*/
                            "<div class='name'>"+data[i].doctorName+"</div>"+
                            "<div class='secondRow'><span>"+data[i].departmentName+"</span><span style='margin-left: 5px;margin-right: 5px;'>|</span><span>"+data[i].positionName+"</span></div>"+
                            "<div>"+data[i].hospitalName+"</div>"+
                        "</div>"+
                   "</div>"+
                "</div>"+
            "</div>";
   			 
   		 }
   		 return content;
   	}   
      
     //页面跳转 
     function jumpDetailPage(e) {
    	 console.log($(e).find('input').val())
    	 var doctorId = $(e).find('input').val();
    	 window.location.href= $("#basePath").val()+"/doctor/detail/"+doctorId;
     } 
        
        
	//初始加载医生列表与下拉列表change时
      function firstShowDoctors(data) {
    	  if(data.length<=0) {
    		  showNoDataAlertModal222("未获取到数据");
    			return;
    		}
 		 var content = '';
 		 for(var i=0;i<data.length;i++) {//height:42px;
 			 var start = (data[i].avgScore) * 1;
 			 start = Math.round(start);
 			 var start2 = "";
 			 var start1 = "";
 			 for(var x=0;x<start;x++) {
 				start2 +=  "<li><img src='static/img/star-24-2.png'></li>";
 			 }
 			 for(var x=0;x< (5-start);x++) {
 				start1 +=  "<li><img src='static/img/star-24-1.png'></li>";
 			 }
 			var allStart = ""+start2 + start1;
 			/*var photoUrl = "static/img/defaultHead.jpg";
 			$.ajax(data[i].photo, {
 	            type: 'get',
 	            timeout: 1000,
 	            success: function() {
 	            	photoUrl = data[i].photo;
 	            	console.log("success");
 	            },
 	            error: function() {
 	               // alert("请求失败");
 	            }
 	        });*/
 			
 			 content += 
 				"<div class='form-group row_content' onclick='jumpDetailPage(this)'>"+
 				"<input type='hidden' id='_doctorIdHidden' value="+data[i].id+" >"+
                "<div class='col-xs-3 control-label' style='padding-left: 0'>"+
                    "<div class='auto_heightBox left' style='min-width: 91px;'>" +
                       "<img class='inline_block'  src='"+data[i].photo+"' >" +
                    "</div>"+
                "</div>"+
                "<div class='col-xs-9' style='padding-left: 5px;'>"+
                    "<div class='auto_heightBox' style='min-width: 239px'>"+
                        "<div class='inline_block right' style='min-width: 234px;width:234px;height: 71px;overflow: hidden'>"+
                           /* "<div class='star'>"+ allStart +
                            "</div>"+*/
                            "<div class='name'>"+data[i].doctorName+"</div>"+
                            "<div class='secondRow'><span>"+data[i].departmentName+
                            	"</span><span style='margin-left: 5px;margin-right: 5px;'>|</span><span>"
                            		+data[i].positionName+
                            	"</span></div>"+
                            "<div>"+data[i].hospitalName+"</div>"+
                        "</div>"+
                   "</div>"+
                "</div>"+
            "</div>";
 		    
 			 /*"<li><img src='static/img/star-24-2.png'></li>"+
             "<li><img src='static/img/star-24-2.png'></li>"+
             "<li><img src='static/img/star-24-2.png'></li>"+
             "<li><img src='static/img/star-24-2.png'></li>"+
             "<li><img src='static/img/star-24-2.png'></li>"+*/
 		 }
 		 $("#doctors").html(content);
 		 
 		/* $("img").each(function() {
 			 $(this).bind('load',function() {
 				 alert("图像加载成功");
 			 })
 			 $(this).bind('error',function() {
 				alert("图像加载失败");			 
 			 })
 		 }*/
 		 
 		 $("img").each(function() {
 			 $(this).bind('load',function() {
 			 })
 			  $(this).bind('error',function() {
 				  $(this).attr("src","static/img/defaultHead.jpg");
 			 })
 		 });
          
 		if( ($("#doctors")[0].scrollHeight) *1 <  (document.documentElement.clientHeight)*1) {
 			$("body").css({"height":"100%"})
 		}
 		 
 		// alert("document.documentElement.clientHeight="+document.documentElement.clientHeight);
 		// alert("document.documentElement.offsetHeight="+document.documentElement.offsetHeight);
 	}  
      
	
	
	//获取医生列表信息
	function getDoctors(status) {//status 1:首次加载 
		/*var regionId = $(".province").attr('id');
		var hospitalId = $("[data-flag='hospitals']").attr('id');*/
		var regionId = 610000;
		var hospitalId = 10; 
		var departmentId = $("[data-flag='deparments']").attr('id');
		var curPage = 1;
		if(status == 1) {
			curPage = 1;
			$("#curPage").val(curPage);
		}else {
			curPage = $("#curPage").val()*1 + 1;
			$("#curPage").val(curPage);
		}
		var getDoctorsUrl = "doctor/getDoctors/"+regionId;
		
		 $.ajax({
			url : getDoctorsUrl,
			type : 'get',
			cache : false,
			dataType : 'json',
    	 	data : {
		      'departmentId' : departmentId,
		      'hospitalId' : hospitalId,
		      'currentPage' : curPage
		     },
			success : function(data) {
				 $("#firstDataLoad").hide();
				if(data.result == 'success') {
					result = data;
					firstShowDoctors(data.data);
				}else {
					showNoDataAlertModal("未获取到数据");
				}
			},
			error : function(data) {
				$("#firstDataLoad").hide();
				showNoDataAlertModal("未获取到数据");
			}
		});  
		
	}
	
	function showHospitals(datas) {
		var hospitals = datas;
	    var childs = '';
		for(var i=0;i<hospitals.length;i++) {
			childs += 
			"<li><a  id='"+hospitals[i].id+"'>"+hospitals[i].hospitalName+"</a></li>"+
	        "<li class='divider'></li>";//页面刷新,首次加载数据
		}
		$("[data-flag='hospitals']").html("全部医院");
		$("[data-flag='hospitals']").attr('id','-1');
		$("[data-flag='hospitalChild']").html('');
		$("[data-flag='hospitalChild']").append(childs);
		getDoctors(1);//
		$("[data-flag='hospitalChild']").find("a").each(function() {
			$(this).click(function() {
				$("[data-flag='hospitals']").html($(this).text());
				$("[data-flag='hospitals']").attr('id',$(this).attr('id'));
				 $("#doctors").html("");
				 $("#firstDataLoad").show();
				$("#allDataFinish").val(0);
				$("#curPage").val(1);
				getDoctors(1);//页面刷新,首次加载数据
			});
		})
	}
	
	//根据cityId获取Hospitals
	function getHospitalsByCity(status) {
		var regionId = $(".province").attr('id');
	
		var getHospitalsByCityUrl = "doctor/getHospitalsByCity";
		
		 $.ajax({
			url : getHospitalsByCityUrl,
			type : 'get',
			cache : false,
			dataType : 'json',
    	 	data : {
		      'cityId' : regionId
		     },
			success : function(data) {
				console.log(data);
				console.log("Hospitals="+data);

				if("success" == data.result) {
					//加载Hospitals
					showHospitals(data.data);
					//获取医生列表

				}else {
					//showNoDataAlertModal("未获取到数据");
				}
			},
			error : function(data) {
				$("#firstDataLoad").hide();
				showNoDataAlertModal("未获取到数据");
			}
		});  
		
	}
	
	
	
	
	
	//初始化省市下拉列表
	function initArea(areas) {
		console.log(areas);
		var e1 = "";
		for(var i=0;i<areas.length;i++) {
			if(areas[i].provinceId*1 == 990000) {
				e1 += "<li id=''>"+
	            "<a class='haiwai' tabindex='0' id='"+areas[i].citys[0].cityId+"'>"+areas[i].provinceName+"</a>";
			}else {
				var citys = areas[i].citys;
				var e2 = '';
				for(var j=0;j<citys.length;j++) {
					  e2 += 
						"<li><a tabindex='0' id='"+citys[j].cityId+"'>"+citys[j].cityName+"</a></li>"+
		                "<li class='divider'></li>";
				}
				
			 	e1 += "<li class='dropdown-submenu'>"+
	            "<a tabindex='0' id='"+areas[i].provinceId+"'>"+areas[i].provinceName+"</a>"+
				
	            "<ul class='dropdown-menu'>"+e2+
	            "</ul>"+
	        	"</li>"+
	        	"<li class='divider'></li>";
			}
		}
		
		$("#provinceChild").append(e1);
		$('[data-submenu]').submenupicker();//这个只能用一次
		$(".haiwai").click(function() {
			var t = $(this).text();
			var replaceStr = '';
			try{
				if(t.length>4){
					replaceStr+=t.substring(0,4);
				}else{
					replaceStr = t;
				}
			}catch(e){
			}
 			var ccc = "<a class='province' id='"+$(this).attr('id')+"' tabindex='0' data-toggle='dropdown' data-submenu="+''+" aria-expanded='false' style='height:32px;padding-top: 0;padding-bottom: 0;padding-left: 10px;padding-right: 10px;color: #000000'>"+
 			replaceStr+" <span class='caret'></span></a>";
 			$('.province').replaceWith(ccc); 
      		var regionId = $(".province").attr('id');
			var hospitalId = $("[data-flag='hospitals']").attr('id');
			var departmentId = $("[data-flag='deparments']").attr('id');
			 $("#doctors").html("");
			 $("#allDataFinishAlert").hide();
			 $("#firstDataLoad").show();//页面刷新,首次加载数据
			 
			 //doctor/getHospitalsByCity
			$("#allDataFinish").val(0);
			$("#curPage").val(1);
			getHospitalsByCity();
			 
		})
		$("#provinceChild").find("ul>li>a").click(function () {
			var t = $(this).text();
			var replaceStr = '';
			try{
				if(t.length>4){
					replaceStr+=t.substring(0,4);
				}else{
					replaceStr = t;
				}
			}catch(e){
			}
 			var ccc = "<a class='province' id='"+$(this).attr('id')+"' tabindex='0' data-toggle='dropdown' data-submenu="+''+" aria-expanded='false' style='height:32px;padding-top: 0;padding-bottom: 0;padding-left: 10px;padding-right: 10px;color: #000000'>"+
 			replaceStr+" <span class='caret'></span></a>";
 			$('.province').replaceWith(ccc); 
      		var regionId = $(".province").attr('id');
			var hospitalId = $("[data-flag='hospitals']").attr('id');
			var departmentId = $("[data-flag='deparments']").attr('id');
			 $("#doctors").html("");
			 $("#allDataFinishAlert").hide();
			 $("#firstDataLoad").show();//页面刷新,首次加载数据
			 
			 //doctor/getHospitalsByCity
			$("#allDataFinish").val(0);
			$("#curPage").val(1);
			getHospitalsByCity();
			 
			//getDoctors(1);
       });
	}
	
	//初始化医院下拉列表
	function initHospitals(hospitals) {
     var childs = '';
		for(var i=0;i<hospitals.length;i++) {
			childs += 
			"<li><a  id='"+hospitals[i].id+"'>"+hospitals[i].hospitalName+"</a></li>"+
	        "<li class='divider'></li>";//页面刷新,首次加载数据
		}
		$("[data-flag='hospitalChild']").append(childs);
		$("[data-flag='hospitalChild']").find("a").each(function() {
			$(this).click(function() {
				$("[data-flag='hospitals']").html($(this).text());
				$("[data-flag='hospitals']").attr('id',$(this).attr('id'));
				 $("#doctors").html("");
				 $("#allDataFinishAlert").hide();
				 $("#firstDataLoad").show();
				 
				 $("#allDataFinish").val(0);
				 $("#curPage").val(1);
				getDoctors(1);//页面刷新,首次加载数据
			});
		})
	}
	
	//初始化科室下拉列表
	function initDeparments(deparments) {
		 var childs = '';
		 for(var i=0;i<deparments.length;i++) {//<ul class="dropdown-menu" role="menu" class="deparmentChild" id="">
			childs += 
			 "<li><a  id='"+deparments[i].id+"'>"+deparments[i].departmentName+"</a></li>"+
             "<li class='divider'></li>";
		}
		 $("[data-flag='deparmentChild']").attr("id",192)
		$("[data-flag='deparmentChild']").append(childs);
		$("[data-flag='deparmentChild']").find("a").each(function() {
			$(this).click(function() {
				$("[data-flag='deparments']").html($(this).text());//+" <span class='caret'></span></a>"
				$("[data-flag='deparments']").attr('id',$(this).attr('id'));
				 $("#doctors").html("");
				 $("#allDataFinishAlert").hide();
				 $("#firstDataLoad").show();//页面刷新,首次加载数据
				$("#allDataFinish").val(0);
				$("#curPage").val(1);
				getDoctors(1);
			});
		})
	}
	
	function initFirstData(data) {
		$(".province").attr('id',data.currentProvinceId);
		$("[data-flag='hospitals']").attr('id',data.currentHospitalId);
		$("[data-flag='deparments']").attr('id',data.currentDepartmentId);
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
	
	$("#firstDataLoad").show();
    $(function () {
    	$("#noDataAlertModal-btn").click(function() {
    		$("#noDataAlertModal").modal("hide");
    	})

   	 	var range = 10;             //距下边界长度/单位px
        var num = 1;
        var totalheight = 0;
        var main = $("#content");                     //主体元素
        $(window).scroll(function(){
            var srollPos = $(window).scrollTop();    //滚动条距顶部距离(页面超出窗口的高度)
            totalheight = parseFloat($(window).height()) + parseFloat(srollPos);
            if(($(document).height()-range) <= totalheight) {
            	if($("#allDataFinish").val() * 1 == 1 ) {
            		return;
            	}
            //	var regionId = $(".province").attr('id');
            	var regionId = 610000;
         	//	var hospitalId = $("[data-flag='hospitals']").attr('id');
            	var hospitalId = 10;
         		var departmentId = $("[data-flag='deparments']").attr('id');
         		var curPage = $("#curPage").val()*1 + 1;
         		
         		$("#curPage").val(curPage);

         		var getDoctorsUrl = "doctor/getDoctors/"+regionId;
         		$("#moreLoading").show();
         		 $.ajax({
         			url : getDoctorsUrl,
         			type : 'get',
         			cache : false,
         			dataType : 'json',
         	    	 data : {
         		      'departmentId' : departmentId,
         		      'hospitalId' : hospitalId,
         		      'currentPage' : curPage
         		     },
         			success : function(data) {
         				 $("#moreLoading").hide();
         				if(data.result == 'success') {
         					if(data.data.length<=0) {
         						$("#allDataFinish").val(1);
         						$("#allDataFinishAlert").show();
         						setTimeout(function() {
         							$("#allDataFinishAlert").hide();
         						},1500);
         						return;
         					}
         					var childs = showDoctors(data.data);
         					$("#doctors").append(childs);
         					/*if( ($("#doctors")[0].scrollHeight) *1 <  (document.documentElement.clientHeight)*1) {
         			 			$("body").css({"height":"100%"})
         			 		}*/
         					
         					$("img").each(function() {
         			 			 $(this).bind('load',function() {
         			 			 })
         			 			  $(this).bind('error',function() {
         			 				  $(this).attr("src","static/img/defaultHead.jpg");
         			 			 })
         			 		 });
         					
         				}else if(data.result == 'fail'){
         					showNoDataAlertModal("无法获取到数据");
         				}
         			},
         			error : function(data) {
         				 $("#moreLoading").hide();
         				showNoDataAlertModal("无法获取到数据");
         			}
         		});  
            }
        });
    	
    	
		//初始化下拉菜单数据
		 $.ajax({
			url : 'doctor/initData',
				type : 'get',
				cache : false,
				dataType : 'json',
				success : function(data) {
					
					if (data.result == "success") {
						/*initArea(data.areas);
						initHospitals(data.hospitals);*/
						//initDeparments(data.deparments);
						var deparments = [{"id":192,"departmentName":"心血管外科"},{"id":1233,"departmentName":"免疫科"}]
						initDeparments(deparments);
					//	initFirstData(data);//初始化选中参数
						getDoctors(1);//status 1:首次加载 医生
					} else if(data.result == 'fail'){
						//showNoDataAlertModal("无法获取到数据");
						 $("#firstDataLoad").hide();
						$("#noDataAlertModalContent").text("无法获取到数据");
						$('#noDataAlertModal').modal({backdrop: 'static', keyboard: false});
						$("#noDataAlertModal").modal("show");
					}
				},
				error : function(data) {
				}
		});
        
	

});