var parallax = {};
parallax.init = function(){
	$(window).on('scroll',function(s){
		var s = $(this).scrollTop();
	});
}
