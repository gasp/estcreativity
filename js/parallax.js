document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

var parallax = {};
parallax.objects = []
parallax.coords = [];
parallax.iScroll = null;
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
	if(app.touch || 1){
		$('.log').addClass('touchenabled');
		parallax.iScroll = new iScroll('wrapper',{
			hScroll:false,
			vScroll:true,
			onScrollStart : function(){
				$('.log').addClass('animated')
			},
			onScrollEnd : function(){
				$('.log').removeClass('animated');
			}
		});
		var s = window.parallax.iScroll.y
		console.log('calling parallax.animationLoop')

		parallax.animationLoop(); // this is where i do the update

	}
//e	else{
		$(window).on("scroll",function(s){
//			var s = getScroll(document)
			var s = $(document).scrollTop();
			parallax.update(s)
		})
//e	}

};
parallax.animationLoop = function(cb){
	window.requestAnimationFrame(parallax.animationLoop);
	var s = window.parallax.iScroll.y;
	parallax.update(-s); // -s because s is inversed
};



parallax.update = function(s){
	$('.log').text('>'+s)
	for (var i = 0; i < parallax.coords.length; i++) {
		if( s > parallax.coords[i].top
			&& s < parallax.coords[i].bottom){
//	MAXI				console.log('parallaxing',parallax.objects[i].name,'i',i,
//	DEBUG				't<s<b',parallax.coords[i].top, s, parallax.coords[i].bottom);
				window[parallax.objects[i].name].parallax(s)
		}
	}
}



// window.requestAnimationFrame polyfill
// shim layer with setTimeout fallback
;(function() {
	var lastTime = 0;
	var vendors = ['webkit', 'moz', 'ms'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
		window.cancelAnimationFrame =
			window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = function(callback, element) {
		var currTime = new Date().getTime();
		var timeToCall = Math.max(0, 16 - (currTime - lastTime));
		var id = window.setTimeout(
			function() { callback(currTime + timeToCall); },
			timeToCall);
		lastTime = currTime + timeToCall;
		return id;
	};

	if (!window.cancelAnimationFrame)
	window.cancelAnimationFrame = function(id) {
		clearTimeout(id);
	};
}());
