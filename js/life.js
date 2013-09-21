var life = {}
life.$section = {};
life.gridheight = {};
life.init = function(){

	life.$section = $("section.sec1");
	life.gridheight = $(".une.colonne",life.$section).width();

	
	// set column height
	$(".colonne, .colonnes", life.$section).css({"height": life.gridheight});
	$(".double, .doubles", life.$section).css({"height": life.gridheight*2});

	life.tweets();
}
life.tweets = function(){
	$(".colonne, .colonnes", life.$section).each(function(){

		var $that = $(this);
		// i don't want headers
		if($that.hasClass("double"))
			return;

		//display images from flickr
		if($that.hasClass("source2")){

			var src = $("img", $that).attr('src');
			$that
				.addClass("flickr")
				.empty()
				.css({
					'background-image': 'url('+src+')',
					'cursor': 'pointer'
				})
				.on("click", function(){
					window.open($(this).data('url-site'), '_blank');
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

		// element should be show to calculate its position
		// therefore, i show it briefly
		// (tiny wtf of the day)
		$that.show();

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