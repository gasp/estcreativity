// 
//  mobile.js
//  est


// minimalistic app
var app = {
	wh:null,
	ww:null
};

var bw = function(){
	var ua = navigator.userAgent.indexOf('MSIE')
	return ! (ua
		&& parseInt(navigator.userAgent.substring(l+5,l+9).split(".")[0]) < 10);
}

$(function(){
	app.wh = $(window).height();
	app.ww = $(window).width();

	if(app.ww > 767){
		if(bw())
			window.location.href="/";
	}

})
$(document).ready(function(){
	$(".sec0").height(app.wh);
	
});