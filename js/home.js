// 
//  home.js
//  estcreativity
//  
//  Created by gaspard on 2013-09-07.
//  Copyright 2013 gaspard. All rights reserved.
// 

home = {};

home.setEnv = function(){
	home.$titles = $('.sec0 .intro');
	home.$cover = $('.sec0 .cover');
	home.top = Math.min(
		(app.wh - home.$titles.height()/6 - home.$titles.height()),
		1000
	);
}

home.setSocial = function(){
	$(".sec0 .social .sbadge").each(function(i){
		$(this).click(function(){
			window.location.href = $(this).data("link");
		})
	});
}

home.setCover = function(){
	home.$cover.height(app.wh)
	home.$titles.css({'top': home.top});
}

home.parallax = function(s){
	if (s < app.wh){
		var r = s/app.wh;
		home.$cover.stop().fadeTo( 30, 1-r)
	}
}

home.init = function(){

	home.setEnv();
	home.setCover();
	home.setSocial();

	home.parallax();
}
