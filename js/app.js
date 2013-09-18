// 
//  app.js
//  estcreativity
//  
//  Created by gaspard on 2013-08-01.
//  Copyright 2013 gaspard. All rights reserved.
// 

app = {
	$w : {},
	wh : 0, // screen/window height;
	ww : 0, // screen/window width
	dh : 0, // body/document height
	touch : false,

	t : null,

	refresh: function(){
		this.$w = $(window);
		this.wh = this.$w.height();
		this.ww = this.$w.width();
		this.dh = $(document).height();

		console.log("app>refreshed",app);
	},

	init: function(){
		console.log('app>initialized');

		// unhide sections
		// cf est-layout.less
		// mus be done _before_ initializing other elemnets
		$('section').show();

		// here init main elements
		$(document).grabScroll();
		app.refresh();
		menu.init();

		app.touch = Modernizr.touch;


		team.init();
		if(!app.touch){
			eyes.init();
			how.init();
		}




		window.setTimeout(function(){
			// parallax for home, how
			// listeners
			// requires home, how
			if(!app.touch)
				parallax.init();

			// 1 time elements placing (quick dom manipulation)
			contacts.init();
			clients.init();
			life.init();
			if(app.touch)
				$('.floating, .filconducteur').hide();
			else
				fil.init()

		},120)
	},
	resize: function(){
		app.refresh();
		console.log("resize still to be managed");
//		window.location.reload();
	}
	
}

// on first read : activate home

$(function(){
	app.refresh();
	home.init();
});

// on load, load all the application
$(window).on("load", function(){
	app.init();
});
$(window).on("resize", function(){
	if(typeof app.t !== "null")
		window.clearTimeout(app.t);
	app.t = window.setTimeout(
		function(){
			app.resize();
		},400)
});
