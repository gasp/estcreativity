var parallax = {};
parallax.objects = []
parallax.coords = [];
parallax.init = function(){

	// setting objects
	parallax.objects = [
		{name: 'home', o : null}, // no need for home, we know its height is app.wh
		{name: 'how', o : how.$el} // requires that how.init() has been triggered
	];

	// setting coords for home
	parallax.coords = [
		{top: 0, bottom: app.wh} // cheating : we already know "home"
	];

	// setting coords for other objects
	for (var i = 0; i < parallax.objects.length; i++) {
		if(!i) continue; // prevent from calculating "home", we'v done it manually
		parallax.coords[i] = window[parallax.objects[i].name].getCoords();
	}

	parallax.listen();
}


parallax.listen = function(){
	$(window).on('scroll',function(){
		var s = $(this).scrollTop();
		
		parallax.update(s)
	});
};

parallax.update = function(s){
	for (var i = 0; i < parallax.coords.length; i++) {
		if( s > parallax.coords[i].top
			&& s < parallax.coords[i].bottom){
//	MAXI				console.log('parallaxing',parallax.objects[i].name,'i',i,
//	DEBUG				't<s<b',parallax.coords[i].top, s, parallax.coords[i].bottom);
				window[parallax.objects[i].name].parallax(s)
		}
	}
}
