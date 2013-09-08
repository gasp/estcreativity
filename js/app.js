app = {
	$w : {},
	wh : 0, // screen/window height;
	ww : 0, // screen/window width
	dh : 0, // body/document height


	refresh: function(){
		this.$w = $(window);
		this.wh = this.$w.height();
		this.ww = this.$w.width();
		this.dh = $(document).height();

		console.log("app>refreshed",app);
	},

	stellar: function(){
		$.stellar({
			responsive:true,
			horizontalScrolling: false
		});
	},

	init: function(){
		console.log('app>initialized');

		
		// unhide sections
		// cf est-layout.less
		// mus be done _before_ initializing other elemnets
		$('section').show();
		app.refresh();
		
		// here init main elements
		$(document).grabScroll();
		menu.init();

		team.init();
		eyes.init();
		how.init();


		window.setTimeout(function(){
			// parallax for home, how
			// listeners
			// requires home, how
			parallax.init();

			// parallax for elements in how
			// listeners
			app.stellar();

			// 1 time elements placing (quick dom manipulation)
			contacts.init();
			clients.init();
			life.init();
			fil.init()
		},120)
	}
}

$(function(){
	app.refresh();
	home.init();
});
$(window).on("load", function(){
	app.init();
})
