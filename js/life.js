var life = {}
life.$section = {};
life.gridheight = {};
life.init = function(){

	life.$section = $("section.sec1");
	life.gridheight = $(".une.colonne",life.$section).width();

	
	// set column height
	$(".colonne, .colonnes", life.$section).css({"height": life.gridheight});
	$(".double, .doubles", life.$section).css({"height": life.gridheight*2});

	// center article
	$("article", life.$section).css({
		'margin-top': (life.gridheight - $("article", life.$section).height()/2)
	});

	life.tweets();
}
life.tweets = function(){
	$(".colonne, .colonnes", life.$section).each(function(){

		// i don't want headers
		if($(this).hasClass("double"))
			return;

		// displays tweets as tweets
		if($(this).hasClass("source2")){
			// wider
			$(this).removeClass("une").addClass("deux").addClass("tweet");
			// center
			var $d = $(".description",$(this));
			$d.css({
				'padding-top': life.gridheight/2 - $d.height()/2
			})
		}
		//display images from flickr
		if($(this).hasClass("source3")){
			
			var src = $("img", $(this)).attr('src');
			$(this).addClass("flickr").empty();
			
			$(this).css({
				'background-image': 'url('+src+')'
			})
		}

		$(this).html(life.linkify($(this).text()))
	});

}

life.linkify = function(text) {
	var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
	return text.replace(exp,"<a href=\"$1\" target=\"_blank\">$1</a>"); 
}