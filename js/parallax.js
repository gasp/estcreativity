$(function(){

	var home = {}
	home.$titles = $('.sec0 .intro');
	home.$cover = $('.sec0 .cover');
	home.top = Math.min(
		(app.wh - home.$titles.height()/6 - home.$titles.height()),
		1000
	);
	home.$cover.height(app.wh)
	
	home.$titles.css({'top': home.top});

	$(window).on('scroll',function(e){
		var s = $(this).scrollTop();
		if (s < app.wh){
			var r = s/app.wh;
			home.$cover.stop().fadeTo( 30, 1-r)
		}
	});

});