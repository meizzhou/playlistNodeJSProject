(function() {

	var GENDER = "";
	var SERVICE = "https://webster.cs.washington.edu/cse154/babynames.php";

	window.onload = function() {
		var ajax = new XMLHttpRequest();
		ajax.onload = displayList;
		ajax.open("GET", SERVICE + "?type=list", true);
		ajax.send();
		document.getElementById("btn").onclick = show;
	};

	// fatch the meaning, popularity and related celebrities according the name 
	// if click twice bring elements to the original display
	function show() {
		document.getElementById("btn").innerHTML = ""; 

	}

})();