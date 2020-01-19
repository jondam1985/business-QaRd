// Sets year in footer copyright
document.addEventListener("DOMContentLoaded", function(){
	if (typeof(document.getElementById("year")) != "undefined" && document.getElementById("year") != null){
		document.getElementById("year").innerHTML = new Date().getFullYear();
	}
});