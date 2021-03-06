var how = {};
how.$el = {};
how.cache = {};
how.loaded = false;

how.objects = [

	{ name : 'ascenceur.asc1' , behavior : 'lift1', alea: null, delta : null}, // stays at 0
	{ name : 'ascenceur.asc2' , behavior : 'lift2', alea: null, delta : null}, // stays at 1

	// water is a big container, it contains fish, bubbles...
	{ name : 'water' , behavior : 'goup', alea : 10, delta : 50},

	{ name : 'welcome' , behavior : 'scaleup', alea : null, delta : 110},

	{ name : 'coffee' , behavior : 'goup', alea: -100, delta : 70},
	{ name : 'sugar' , behavior : 'jiggle', alea: 100, delta : 20},
	
	{ name : 'cloud01' , behavior : 'goup', alea: 30, delta : 20},
	{ name : 'cloud02' , behavior : 'jiggle', alea: 70, delta : 10},
	{ name : 'cloud03' , behavior : 'goup', alea: 0, delta : 50},

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

	{ name : 'bubblesmall01' , behavior : 'goup', alea: 10, delta : 300},
	{ name : 'bubblesmall02' , behavior : 'goup', alea: 0, delta : 600},
	{ name : 'bubblesmall03' , behavior : 'goup', alea: 0, delta : 300},
	{ name : 'bubblemed' , behavior : 'goup', alea: 0, delta : 200},
	{ name : 'bubblecoffre' , behavior : 'goup', alea: 30, delta : 100},

	{ name : 'fishark' , behavior : 'goleft', alea: null, delta : 30},

	{ name : 'bag' , behavior : 'jiggle', alea: 70, delta : 20},
	{ name : 'money' , behavior : 'jiggle', alea: 70, delta : 10},
	
	{ name : 'rightglass' , behavior : 'waggle', alea: 100, delta : 10},

	{ name : 'questionmark' , behavior : 'rotateleft', alea: 50, delta : 100},
	{ name : 'clock.minute' , behavior : 'rotateright', alea: 0, delta : 100},
	{ name : 'clock.hour' , behavior : 'rotateright', alea: 5, delta : 8.3}, // 100/12 = 8.3

	{ name : 'strategyribbon' , behavior : 'goright', alea: null, delta : 30},
	{ name : 'whitechess' , behavior : 'goleft', alea: null, delta : 50},
	{ name : 'blurwhitechess' , behavior : 'goright', alea: null, delta : 20},
	{ name : 'coffeesmall' , behavior : 'goright', alea: null, delta : 40},
	{ name : 'blackchess' , behavior : 'rotateleft', alea: 10, delta : 5},

	{ name : 'voteyes' , behavior : 'slidedown', alea: null, delta : 300},
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
	if(app.ww < 1440){
		how.objects[0].behavior = 'lift1small';
		how.objects[1].behavior = 'lift2small';
	}
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
/*
			if(app.ww < 1440)
				console.log('please redo animation for small screens');
*/

			var css = {
				top:   Math.floor(how.objects[i].position.top + d.top),
				left:  Math.floor(how.objects[i].position.left + d.left)
			};

			// rotate
			if(typeof d.rotate !== "undefined"){
				css.transform = 'rotate('+ Math.floor(d.rotate) +'deg)';
			} 

			// scale
			if(typeof d.scale !== "undefined"){
				css.transform = 'scale('+ d.scale +')';
			}

			// slide
			if(typeof d.bgtop !== "undefined"){
				css['background-position'] = '0 '+d.bgtop+'px';
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
		return {top: Math.floor((Math.cos(s/alea)*delta)), left:0};
	},
	waggle: function(s, alea, delta, top){ // left mvt
		return {top:0, left: Math.floor((Math.cos(s/alea)*delta))};
	},
	goright: function(s, alea, delta, top){
		//something between 0 and 1;
		//var d = (s-top)/app.wh
		//console.log(d);
		return {
			top:0,
			left: (s-top)/app.wh * delta
		}
	},
	goleft: function(s, alea, delta, top){
		return {
			top:0,
			left: 1- how.animate.goright(s, alea, delta, top).left
		}
	},
	godown : function(s, alea, delta, top){
		return {
			top: (0- Math.min(1,Math.max(0,(top-s - alea)/app.wh))) * delta,
			left:0
		}
	},
	goup : function(s, alea, delta, top){
		return {
			top: Math.min(1,Math.max(0, (top-s -alea)/app.wh)) * delta ,
			left:0
		}
	},
	rotateleft : function(s, alea, delta, top){ // to debug
		return {
			top:0,left:0,
			rotate: -1 * how.animate.rotateright(s, alea, delta, top).rotate
			//(s-top)/app.wh * (-delta/100 + alea/100)
		}
	},
	rotateright : function(s, alea, delta, top){ // to debug
		return {
			top:0,left:0,
			rotate: ((s-top)/app.wh * delta/100 + alea/100) * 360
			// (s-top)/app.wh * (100/delta + alea/100)
		}
	},
	scaleup : function(s, alea, delta, top){
		return {
			top:0,left:0,
			scale: (s-top+app.wh)/app.wh * (delta/100)
		}
	},
	slidedown : function(s, alea, delta, top){
		// slide to down
		// alea = since when do we move, which distane between top and animation start
		return {
			top:0,left:0,
			bgtop:  Math.max(delta-top+s, 0)
		}
	},
	lift1 : function(s, alea, delta, top){

		// dleft & dright close
		// aiguille rolls
		// asc1 follows scroll
		// asc1 fades

		var distance = top-s,
			closingpoint = 100, // when should the closing point start
			rollingpoint = 100; // when should the lift should start rolling

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

		return {top:0,left:0,r:0};
	},
	lift1small : function(s, alea, delta, top){

		// dleft & dright close
		// aiguille rolls
		// asc1 follows scroll
		// asc1 fades

		var distance = top-s,
			closingpoint = 100, // when should the closing point start
			rollingpoint = 100; // when should the lift should start rolling

		var closing = ((distance-closingpoint)-10);
		if(closing < 10) closing = 0;

		if(distance > closingpoint && distance < (closingpoint+200)){
			$('.dleft',how.objects[0].el).css({left:'-'+closing/2+'px'})
			$('.dright',how.objects[0].el).css({left: 30+closing/2+'px'})
		}
		else{
			if(distance > closingpoint){
				// open
				$('.dleft',how.objects[0].el).css({left: '-31px'})
				$('.dright',how.objects[0].el).css({left: '61px'})
			}
			if(distance < (closingpoint+200)){
				// close
				$('.dleft',how.objects[0].el).css({left: '0px'})
				$('.dright',how.objects[0].el).css({left: '30px'})
			}
		}

		if(closing==0){
			$('.aiguille',how.objects[0].$el).css({
				// making the aiguille roll
				// /2 because if not it rolls too much
				transform:'rotate('+(220-distance-closingpoint)/2+'deg)'
			});
		}

		return {top:0,left:0,r:0};
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
	},
	lift2small : function(s, alea, delta, top){
		// dleft & dright open

		var distance = top-s,
			closingpoint = 10; // when should the closing point start

		var closing = ((distance-closingpoint)-10);
		if(closing < 10) closing = 0;

		if(distance > closingpoint && distance < (closingpoint+200)){
			$('.dleft',how.objects[0].el).css({left: -(200-closing)/4+'px'})
			$('.dright',how.objects[0].el).css({left: 30+(200-closing)/4+'px'})
		}
		else{
			// opposite of lift1
			if(distance > closingpoint){
				// close
				$('.dleft',how.objects[0].el).css({left: '0px'})
				$('.dright',how.objects[0].el).css({left: '30px'})
			}
			if(distance < (closingpoint+200)){
				// open
				$('.dleft',how.objects[0].el).css({left: '-30px'})
				$('.dright',how.objects[0].el).css({left: '61px'})
			}
		}
		return {top:0,left:0,r:0};
	}
}