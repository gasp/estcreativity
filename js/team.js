var team = {};
team.$mates = $("section.sec2 .mate");
team.$nav = $("section.sec2 .navigation");

team.resolutions = [400,600,800,1000,1500];
team.height = 1000;

team.members = ["stephane","ralf","flo","bruno","william","clement","gaspard"];
team.mi = []; // members iterator, basically [0,1,2,3,4,5...] for shuffle purpose
$(team.members).each(function(i) {
	team.mi.push(i);
});

team.max = 5; // maximum of mates to display
team.start = 0; // I am currently starting with mate 0 (...to mate 4)



team.init = function(){
	var that = this,
		i = 0;

	while (team.resolutions[i]<app.wh && i < team.resolutions.length) {
		team.height = team.resolutions[i];
		i++;
	}
	team.i = i-1;

	if(team.i < 0){
		$('section.sec2').text("Thete is not enough space to display this content, please make this window bigger.")
		return;
	}

	team.$mates.css({"height": app.wh});

	team.$mates.each(function(i){
		$(this).css({
			'background-image':'url(/squelettes/images/team/'+that.members[i]+'-'+team.height+'.jpg)'
		});

		// I can display only 5 elements so when i == 4 I am at the maximu
		if(i > (team.max -1)) {
			$(".right",team.$nav).show();
			$(this).hide();

		}
	});

	team.place();
	team.bind();
}

team.place = function(){

	var w = $(team.$mates.get(0)).width(),
	spacers = [
		{top:300,bottom:100},
		{top:450, bottom:200}, // when the image is 600px height, top is 450 from bottom et bottom is 200px from bottom
		{top:600, bottom:280}, // 800
		{top:750, bottom:355}, // 1000
		{top:900, bottom:430}, // 1200
		{top:1100, bottom:500} // 1500
	];
//	console.log(">> ",team.height, team.i, spacers[team.i])
	

	$(".top",this.$mate).css({
		'top': 0,
		'height': app.wh - spacers[team.i].top,
		'width' : w
	});
	$(".top .fname",this.$mate).css({
		'margin-top': (app.wh - spacers[team.i].top) -120 
	});

	$(".bottom",this.$mate).css({
		'top': app.wh - spacers[team.i].bottom,
		'height': spacers[team.i].bottom,
		'width' : w
	});
};

team.bind = function(){

	$(".top, .bottom",team.$mates).hide();
	team.$mates.on("mouseover",function(){
		$(".top, .bottom",this).stop().show();
		$(".eyes",this).stop().hide();
		eyes.animate();
	}).on("mouseout",function(){
		$(".top, .bottom",this).stop().hide();
		$(".eyes",this).stop().show();
		eyes.freeze();
	});

	$(".right",team.$nav).on("click", function(e){
		Math.min(team.start ++, team.members.length - team.max);
		team.navigate(team.start);
		e.preventDefault();
	});

	$(".left",team.$nav).on("click", function(e){
		Math.max(team.start --, 0);
		team.navigate(team.start);
		e.preventDefault();
	});

};

team.navigate = function(start){
	
	console.log("starting at teammate %d : %s", start, team.members[start]);
	
	if((start + team.max) >= team.members.length)
		$(".right",team.$nav).hide();
	else
		$(".right",team.$nav).show();
	
	if(start == 0)
		$(".left",team.$nav).hide();
	else
		$(".left",team.$nav).show();

	team.$mates.each(function(i){
		if(i < start || i > (start+team.max))
			$(this).hide();
		else
			$(this).show();
	});
}

var eyes = {}
eyes.init = function(){
	// team.init must be called before
	// and it should be enabled
	if(typeof team.i === "undefined" || team.i < 0)
		return;

	var w = $(team.$mates.get(0)).width(),
		d = $("<div />").addClass("eyes");
	
	wh = $(window).height();
	
	positions = [
		{top:240, height:30, bgpos:161},
		{top:370, height: 50, bgpos:231}, // when the image is 600px height, top is 450 from bottom et bottom is 200px from bottom
		{top:500, height: 70, bgpos:301}, // 800
		{top:620, height: 90, bgpos:381}, // 1000
		{top:900, height: 100, bgpos:430}, // 1200
		{top:1100, bottom:500} // 1500
	];

	var j = eyes.shuffle(team.mi);

	team.$mates.each(function(i){
		var $ey = $(d).clone();

//		console.log(" eyes: ",team.i,positions[team.i],team.resolutions[team.i])

		$ey.css({
			'background-image':'url(/squelettes/images/team/'+team.members[j[i]]+'-'+team.height+'.jpg)',
			'background-position':'center -'+ positions[team.i].bgpos +'px',
			'width': w,
			'height': positions[team.i].height,
			'top': wh - positions[team.i].top
		})
		$(this).append($ey)
//		console.log($ey,this)
/*
		$ey.css({
			'background-image':'url(images/team/'+team.members[j[i]]+'-'+team.height+'.jpg)',
			'background-position':'center -'+positions[team[i]].bgpos+'px',
			'width': w,
			'height': positions[team[i]].height,
			'top': wh - positions[team[i]].top
		})
*/
	});
}

eyes.swap = function(){
	var shuffled = eyes.shuffle(team.mi);

	team.$mates.each(function(i){
		console.log(i,team.members[shuffled[i]]);
		var $ey = $(".eyes",this)
		$ey.css({
			'background-image':'url(/squelettes/images/team/'+team.members[shuffled[i]]+'-'+team.height+'.jpg)',
		})
	});

}
eyes.shuffle = function(v){
	for(var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
	return v;
};

eyes.time = {};

eyes.animate = function(){
	eyes.time = window.setInterval(function(){
		eyes.swap();
	},600)
}
eyes.freeze = function(){
	window.clearTimeout(eyes.time)
}
