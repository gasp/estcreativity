$(function(){
	var life = {}
	life.$section = $("section.sec1");
	life.gridheight = $(".une.colonne",life.$section).width();
	life.init = function(){
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

		});

	}
	
	life.init()
});