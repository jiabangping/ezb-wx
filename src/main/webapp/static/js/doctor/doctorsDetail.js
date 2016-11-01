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
   			 content += 
   				"<div class='form-group row_content' >"+
                "<div class='col-xs-3 control-label' style='padding-left: 0'>"+
                    "<div class='auto_heightBox left' style='min-width: 91px;'>" +
                       "<img class='inline_block' src='"+data[i].photo+"' >" +
                    "</div>"+
                "</div>"+
                "<div class='col-xs-9' style='padding-left: 5px;'>"+
                    "<div class='auto_heightBox' style='min-width: 239px'>"+
                        "<div class='inline_block right' style='min-width: 234px;width:234px;height: 71px;overflow: hidden'>"+
                            "<div class='star'>"+
                                "<li><img src='static/img/star-24-2.png'></li>"+
                                "<li><img src='static/img/star-24-2.png'></li>"+
                                "<li><img src='static/img/star-24-2.png'></li>"+
                                "<li><img src='static/img/star-24-2.png'></li>"+
                                "<li><img src='static/img/star-24-2.png'></li>"+
                            "</div>"+
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
        
        
	//初始加载医生列表与下拉列表change时
      function firstShowDoctors(data) {
    	  if(data.length<=0) {
      		//showNoDataAlertModal("无更多数据");
    			return;
    		}
 		 var content = '';
 		 for(var i=0;i<data.length;i++) {//height:42px; 
 			 content += 
 				"<div class='form-group row_content' >"+
                "<div class='col-xs-3 control-label' style='padding-left: 0'>"+
                    "<div class='auto_heightBox left' style='min-width: 91px;'>" +
                       "<img class='inline_block' src='"+data[i].photo+"' >" +
                    "</div>"+
                "</div>"+
                "<div class='col-xs-9' style='padding-left: 5px;'>"+
                    "<div class='auto_heightBox' style='min-width: 239px'>"+
                        "<div class='inline_block right' style='min-width: 234px;width:234px;height: 71px;overflow: hidden'>"+
                            "<div class='star'>"+
                                "<li><img src='static/img/star-24-2.png'></li>"+
                                "<li><img src='static/img/star-24-2.png'></li>"+
                                "<li><img src='static/img/star-24-2.png'></li>"+
                                "<li><img src='static/img/star-24-2.png'></li>"+
                                "<li><img src='static/img/star-24-2.png'></li>"+
                            "</div>"+
                            "<div class='name'>"+data[i].doctorName+"</div>"+
                            "<div class='secondRow'><span>"+data[i].departmentName+"</span><span style='margin-left: 5px;margin-right: 5px;'>|</span><span>"+data[i].positionName+"</span></div>"+
                            "<div>"+data[i].hospitalName+"</div>"+
                        "</div>"+
                   "</div>"+
                "</div>"+
            "</div>";
 		    
 		 }
 		 $("#doctors").html(content);
 	}  
      
	
	
	//获取医生列表信息
	function getDoctors(status) {//status 1:首次加载 
		var regionId = $(".province").attr('id');
		var hospitalId = $("[data-flag='hospitals']").attr('id');
		var departmentId = $("[data-flag='hospitals']").attr('id');
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
		var e1 = "";
		for(var i=0;i<areas.length;i++) {
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
		
		$("#provinceChild").append(e1);
		$('[data-submenu]').submenupicker();//这个只能用一次
		
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
			var departmentId = $("[data-flag='hospitals']").attr('id');
			 $("#doctors").html("");
			 $("#firstDataLoad").show();//页面刷新,首次加载数据
			 
			 //doctor/getHospitalsByCity
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
				 $("#firstDataLoad").show();
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
		$("[data-flag='deparmentChild']").append(childs);
		$("[data-flag='deparmentChild']").find("a").each(function() {
			$(this).click(function() {
				$("[data-flag='deparments']").html($(this).text());//+" <span class='caret'></span></a>"
				$("[data-flag='deparments']").attr('id',$(this).attr('id'));
				 $("#doctors").html("");
				 $("#firstDataLoad").show();//页面刷新,首次加载数据
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
            	var regionId = $(".province").attr('id');
         		var hospitalId = $("[data-flag='hospitals']").attr('id');
         		var departmentId = $("[data-flag='hospitals']").attr('id');
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
         					var childs = showDoctors(data.data);
         					$("#doctors").append(childs);
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
					if (data.result == 'success') {
						initArea(data.areas);
						initHospitals(data.hospitals);
						initDeparments(data.deparments);
						initFirstData(data);//初始化选中参数
						getDoctors(1);//status 1:首次加载 医生
					} else if(data.result == 'fail'){
					}
				},
				error : function(data) {
				}
			});

});