var life = {}
life.$section = {};
life.gridheight = {};
life.init = function(){

	life.$section = $("section.sec1");
	life.gridheight = $(".une.colonne",life.$section).width();

	
	// set column height
	$(".colonne, .colonnes", life.$section).css({"height": life.gridheight});
	$(".double, .doubles", life.$section).css({"height": life.gridheight*2});

	//if very narrow (or) vertical triple
	if(app.ww/app.wh < 1 || app.ww < 800)
		$(".double, .doubles", life.$section).css({"height": life.gridheight*3});

	life.tweets();
}
life.tweets = function(){
	$(".colonne, .colonnes", life.$section).each(function(){

		var $that = $(this);
		// i don't want headers
		if($that.hasClass("double"))
			return;

		// element should be show to calculate its position
		// therefore, i show it briefly
		// (tiny wtf of the day)
		$that.show();

		//display images from flickr and instagram
		if($that.hasClass("source2") || $that.hasClass("source8")){

			var src = $("img", $that).attr('src');
			$that
				.addClass("flickr")
				.empty()
				.css({
					'background-image': 'url('+src+')',
					'cursor': 'pointer'
				})
				.on("click", function(){
					if (that.hasClass("source2"))
						window.open("http://www.flickr.com/photos/est_creativity", '_blank');
					// deep linking to image
					else
						  window.open($(this).data('url-artice'), '_blank');
				});
		}

		// displays tweets as tweets
		else{
			// wider
			$that.removeClass("une").addClass("deux").addClass("tweet");
			// center
			var $d = $(".description",$that);
			$d.css({
				'padding-top': life.gridheight/2 - $d.height()/2
			})
		}

		// i don't want the ones under the fold
		if(($that.position().top + life.gridheight) > app.wh){
			$that.hide()
			return;
		}

		$(".description",$that).html(life.linkify($(".description",$that).text()));

	});

}

life.linkify = function(text) {
	var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
	return text.replace(exp,"<a href=\"$1\" target=\"_blank\">$1</a>"); 
}