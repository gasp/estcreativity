var clients ={}
clients.$obj = {};
clients.init = function(){
	clients.$obj = $("section.sec4");

	// set page layout
	$(".cinquante",clients.$obj).height(app.wh/2);

	// place logos 2/3 - 1/3 spacing
	var $logos = $(".logos",clients.$obj);
	var lh = $logos.height();
	if(lh< app.wh){ // if we need to place the logos
		$logos.css({
			'padding-top': Math.floor((app.wh/2 - lh) * 2/3)
		});
	}
}

$(function(){
	clients.init();
})
