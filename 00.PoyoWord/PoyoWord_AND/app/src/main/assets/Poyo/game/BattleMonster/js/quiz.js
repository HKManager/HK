var setactiveans = function(ele)
{
	if(document.querySelector('.active'))
		document.querySelector('.active').className = "";
	ele.className = "active";
}

var submitAnswer = function() 
{
  var answer = document.getElementsByClassName('active')[0].innerText;


  alert(answer);

  var abc = 0;
  // var attempt = (document.getElementsByClassName('active')[0].id == "correctans") ? true : false;
}