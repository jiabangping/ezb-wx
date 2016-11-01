$(function(){
	$(".close_btn").hover(
		function () {
	    	$(this).css({
	    		color: 'black'
	        })
		}, 
		function(){
	    	$(this).css({
	    		color: '#999'
	    	})
		})
    .on('click', function () { 
        $("#maskAlert").css({
        	display: 'none'
        });
     });
	initSetCookie();
	initGetCookie();
})
	
function initGetCookie() {
	var DoctorName = unescape(getCookie("DoctorName"));
	if(DoctorName != "") {
		$("#doctorName").text(DoctorName);
	}
	showLoading();
}
	
	
function initSetCookie() {
	var expiresHours = 7*24;
	var registerStatus = "OK";
	addCookie("registerStatus",registerStatus,expiresHours);
}

function showLoading() {
	$("#dataLoding").show();
	setTimeout(LoadingHide, 500);
}
function LoadingHide() {
	$("#dataLoding").hide();
	//$("#alertContent").text("您的资料提交成功,等待审核中。");
	//$("#maskAlert").show();
	modalShow();
}

function modalHide() {
    $('#myModal2').modal('hide');
}
function modalShow() {
    $('#myModal2').modal('show');
    //setTimeout(modalHide,1500);
}
	