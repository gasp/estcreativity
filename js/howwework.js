var how = {};
how.$el = {};
how.cache = {};
how.loaded = false;

how.objects = [

	{ name : 'ascenceur.asc1' , behavior : 'lift1', alea: null, delta : null}, // stays at 0
	{ name : 'ascenceur.asc2' , behavior : 'lift2', alea: null, delta : null}, // stays at 1

	{ name : 'coffee' , behavior : 'goup', alea: 100, delta : 70},
	{ name : 'sugar' , behavior : 'jiggle', alea: 100, delta : 20},
	
/*	{ name : 'cloud01' , behavior : 'goup', alea: 100, delta : 20},
	{ name : 'cloud02' , behavior : 'godown', alea: 100, delta : 30},
	{ name : 'cloud03' , behavior : 'goup', alea: 100, delta : 50},
*/	

	{ name : 'cloud01' , behavior : 'goup', alea: 100, delta : 20},
	{ name : 'cloud02' , behavior : 'jiggle', alea: 70, delta : 10},
	{ name : 'cloud03' , behavior : 'goup', alea: 100, delta : 50},

	{ name : 'birds' , behavior : 'godown', alea: 100, delta : 150},

	{ name : 'fish01' , behavior : 'goright', alea: null, delta : 150},
	{ name : 'fish02' , behavior : 'goleft', alea: null, delta : 50},
	{ name : 'fish03' , behavior : 'goleft', alea: null, delta : 20},
	{ name : 'fish04' , behavior : 'goleft', alea: null, delta : 70},
	{ name : 'fish05' , behavior : 'goright', alea: null, delta : 50},
	{ name : 'fish06' , behavior : 'goright', alea: null, delta : 150},
	{ name : 'fish07' , behavior : 'goright', alea: null, delta : 120},
	{ name : 'fish08' , behavior : 'goleft', alea: null, delta : 100},
	{ name : 'fishred' , behavior : 'goleft', alea: null, delta : 50},

	{ name : 'bubblesmall01' , behavior : 'goup', alea: null, delta : 300},
	{ name : 'bubblesmall02' , behavior : 'goup', alea: null, delta : 200},
	{ name : 'bubblesmall03' , behavior : 'goup', alea: null, delta : 300},
	{ name : 'bubblemed' , behavior : 'goup', alea: null, delta : 200},
	{ name : 'bubblecoffre' , behavior : 'goup', alea: null, delta : 100},
	

	{ name : 'fishark' , behavior : 'goleft', alea: null, delta : 30},

	{ name : 'bag' , behavior : 'jiggle', alea: 70, delta : 20},
	{ name : 'money' , behavior : 'jiggle', alea: 70, delta : 10},
	
	{ name : 'rightglass' , behavior : 'waggle', alea: 100, delta : 10},

	{ name : 'questionmark' , behavior : 'rotateright', alea: 0, delta : 100},
	{ name : 'clock.minute' , behavior : 'rotateright', alea: 0, delta : 50},
	{ name : 'clock.hour' , behavior : 'rotateright', alea: 0, delta : 500},

	{ name : 'strategyribbon' , behavior : 'goright', alea: null, delta : 30},
	{ name : 'whitechess' , behavior : 'goleft', alea: null, delta : 50},
	{ name : 'blurwhitechess' , behavior : 'goright', alea: null, delta : 20},
	{ name : 'coffeesmall' , behavior : 'goright', alea: null, delta : 40},
	{ name : 'blackchess' , behavior : 'rotateright', alea: 10, delta : 1000},

]

how.load = function(){
	for (var i = 0; i < how.objects.length; i++) {
		how.objects[i].$el = $('.illus.'+how.objects[i].name, how.$el);
		how.objects[i].offset = how.objects[i].$el.offset();
		how.objects[i].position = how.objects[i].$el.position();
	}
	how.loaded = true;
}

how.unload = function(){} // nada


how.init = function(){
	how.$el = $("#howwework");
	how.load();
	how.welcome();

}

how.getCoords = function(){
	
	// since when can we see the top of the #howwework element
	var top = how.$el.offset().top - app.wh;
	// when do we disgard it.
	var bottom = top + how.$el.height() + app.wh;
	
	return {top:top,bottom:bottom};
}

how.parallax = function(s){
	
	for (var i = 0; i < how.objects.length; i++) {
		if(Math.abs(s - how.objects[i].offset.top) < app.wh + 200){
			var b = how.objects[i].behavior;
			var d = how.animate[b]( s, how.objects[i].alea, how.objects[i].delta, how.objects[i].offset.top);

//			console.log(how.objects[i], d);

			var css = {
				top:   Math.floor(how.objects[i].position.top + d.top),
				left:  Math.floor(how.objects[i].position.left + d.left)
			};


			if(d.r > 0){
				css.transform = 'rotate('+ Math.floor(d.r * 360) +'deg)';
			} 

			

			$(how.objects[i].$el).css(css)

/*			console.log('animate',how.objects[i].name,
				'animated by',how.objects[i].behavior);
*/
		}
	}
	
}

how.animate = {
	jiggle: function(s, alea, delta, top){ // top mvt
		return {top: Math.floor((Math.cos(s/alea)*delta)), left:0, r:0};
	},
	waggle: function(s, alea, delta, top){ // left mvt
		return {top:0, left: Math.floor((Math.cos(s/alea)*delta)), r:0};
	},
	goright: function(s, alea, delta, top){
		//something between 0 and 1;
		//var d = (s-top)/app.wh
		//console.log(d);
		return {top:0, left: 
			(s-top)/app.wh * delta,
			r:0
		}
	},
	goleft: function(s, alea, delta, top){
		return {top:0, left: 
			1- how.animate.goright(s, alea, delta, top).left,
			r:0
		}
	},
	godown : function(s, alea, delta, top){
		return {
			top: (s-top)/app.wh * delta,
			left:0, r:0
		}
	},
	goup : function(s, alea, delta, top){
		return {
			top: 1-how.animate.godown(s, alea, delta, top).top,
			left:0, r:0
		}
	},
	rotateleft : function(s, alea, delta, top){
		return {
			top:0,left:0, r:(s-top)/app.wh * (100/delta)  + 1/100 * alea
		}
	},
	rotateright : function(s, alea, delta, top){
		return {
			top:0,left:0, r: 1-how.animate.rotateleft(s, alea, delta, top).r
		}
	},
	lift1 : function(s, alea, delta, top){

		// dleft & dright close
		// aiguille rolls
		// asc1 follows scroll
		// asc1 fades

		var distance = top-s,
			closingpoint = 100, // when should the closing point start
			rollingpoint = 100, // when should the lift should start rolling
			t = 0;				// initial top distance

		var closing = ((distance-closingpoint)-10);
		if(closing < 10) closing = 0;

		if(distance > closingpoint && distance < (closingpoint+200)){
			$('.dleft',how.objects[0].el).css({left:'-'+closing+'px'})
			$('.dright',how.objects[0].el).css({left: 60+closing+'px'})
		}
		else{
			if(distance > closingpoint){
				// open
				$('.dleft',how.objects[0].el).css({left: '-61px'})
				$('.dright',how.objects[0].el).css({left: '122px'})
			}
			if(distance < (closingpoint+200)){
				// close
				$('.dleft',how.objects[0].el).css({left: '0px'})
				$('.dright',how.objects[0].el).css({left: '61px'})
			}
		}

		if(closing==0){
			$('.aiguille',how.objects[0].$el).css({
				// making the aiguille roll
				// /2 because if not it rolls too much
				transform:'rotate('+(220-distance-closingpoint)/2+'deg)'
			});
		}

		// when doors are close, asc1 follows the scroll
		// and fades
		if(distance > -200 && distance < 0){

			// follow the scroll
			t = -distance;

			// fade
			opacity = (200+distance)/200;
			if(opacity < .1) opacity = 0;
			if(opacity > .9) opacity = 1;
			how.objects[0].$el.css({opacity: opacity })
		}

		return {top:t,left:0,r:0};
	},
	lift2 : function(s, alea, delta, top){
		// dleft & dright open

		var distance = top-s,
			closingpoint = 10; // when should the closing point start

		var closing = ((distance-closingpoint)-10);
		if(closing < 10) closing = 0;

		if(distance > closingpoint && distance < (closingpoint+200)){
			$('.dleft',how.objects[0].el).css({left: -(200-closing)/4+'px'})
			$('.dright',how.objects[0].el).css({left: 60+(200-closing)/4+'px'})
		}
		else{
			// opposite of lift1
			if(distance > closingpoint){
				// close
				$('.dleft',how.objects[0].el).css({left: '0px'})
				$('.dright',how.objects[0].el).css({left: '61px'})
			}
			if(distance < (closingpoint+200)){
				// open
				$('.dleft',how.objects[0].el).css({left: '-61px'})
				$('.dright',how.objects[0].el).css({left: '122px'})
			}
		}
		return {top:0,left:0,r:0};
	}
	
}

how.welcome = function(){
	$("#howwework").waypoint(function(direction) {
		if(direction == "down"){
			$(".illus.welcome",this).css({'visibility':'hidden'});
			$(".illus.welcome.fixed",this).css({'visibility':'visible'});
			
		}	
		else{
			$(".illus.welcome",this).css({'visibility':'visible'});
			$(".illus.welcome.fixed",this).css({'visibility':'hidden'});
		}
	});
}
