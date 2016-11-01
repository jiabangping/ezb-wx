$(function() {
	 $("#check1").click(function(){
	        var checkInput = document.getElementById("check1");
	        if(checkInput.checked == true) {
	            $("#accept").attr("class","btn btn-success btn-lg btn-block");
	        }else{
	            $("#accept").attr("class","btn btn-success btn-lg btn-block disabled");
	        }
	    });

	   $("#accept").click(function() {
		   if($("#accept").attr("class") != 'btn btn-success btn-lg btn-block disabled') {
			   window.location.href="doctor/signUpPage?protocolConfirm=1";   
		   }
	   })
})