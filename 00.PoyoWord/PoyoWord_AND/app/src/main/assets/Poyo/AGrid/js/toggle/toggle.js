function codeView(){
	var clickb = document.getElementById("clickb").value;
	if(clickb=='code View'){
		document.getElementById("clickb").value="code Hide";
	}else if(clickb=='code Hide'){
		document.getElementById("clickb").value="code View";
	}
	
	$("#toggle2").slideToggle(function(){
		if($("#toggle2").css('display') == "none"){
			$(".example_box_m > pre").css('border-top-width', '1px');
		}
		else {
			$(".example_box_m > pre").css('border-top-width', '0px');
		}
	});
}