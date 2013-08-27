// this should be called after parallax and grabScroll that set some height
var menu = {
	state : 'opened',
	$navbar : $(".navbar"),
	$brand : {},
	init : function(){
		var m = this;
		this.$navbar.hide();
		this.place();
		this.$brand.on('click',function(e){
			if(m.state == 'opened')  m.close('fast');
			else m.open('fast');
			e.preventDefault()
		});
	},
	place : function(){
		this.$brand = $(".brand",this.$navnar);
	
		var nw = this.$navbar.width(),
			bw = this.$brand.width();

		this.$brand.css({'left': nw/2-bw/2});

		this.close(0)
	},
	open : function(t){
		this.$navbar.animate({top:  0},t);
		this.state = 'opened';
	},
	close : function(t){
		this.$navbar.animate({top:  - this.$navbar.height()},t);
		this.state = 'closed';
	}
};


/*
	TODO integrate this into the init and specify the right name of the slide
*/
$(function(){
	$(".sec1").waypoint(function(direction){
		if(direction == "down") menu.$navbar.stop().fadeIn()
		else menu.$navbar.stop().fadeOut();
	})

})

menu.init()