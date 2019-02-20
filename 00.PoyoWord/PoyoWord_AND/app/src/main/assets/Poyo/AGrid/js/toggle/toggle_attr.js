function codeView(){
	var clickb = document.getElementById("clickb").value;
	if(clickb=='code View'){
		document.getElementById("clickb").value="code Hide";
	}else if(clickb=='code Hide'){
		document.getElementById("clickb").value="code View";
	}
	$("#toggle").slideToggle();
	
}