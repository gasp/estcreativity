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
		
		$(".sec1").waypoint(function(direction){
			if(direction == "down") menu.$navbar.stop().fadeIn()
			else menu.$navbar.stop().fadeOut();
		});
		$(".sec2").waypoint(function(direction){
			$('.sep',menu.$navbar).removeClass('active')
			if(direction == "down") $($('.sep',menu.$navbar)[1]).addClass('active')
			else $($('.sep',menu.$navbar)[0]).addClass('active')
		});
		$(".sec3").waypoint(function(direction){
			$('.sep',menu.$navbar).removeClass('active')
			if(direction == "down") $($('.sep',menu.$navbar)[2]).addClass('active')
			else $($('.sep',menu.$navbar)[1]).addClass('active')
		});
		$(".sec4").waypoint(function(direction){
			$('.sep',menu.$navbar).removeClass('active')
			if(direction == "down") $($('.sep',menu.$navbar)[3]).addClass('active')
			else $($('.sep',menu.$navbar)[2]).addClass('active')
		});
		$(".sec5").waypoint(function(direction){
			$('.sep',menu.$navbar).removeClass('active')
			if(direction == "down") $($('.sep',menu.$navbar)[4]).addClass('active')
			else $($('.sep',menu.$navbar)[3]).addClass('active')
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
		this.$navbar.stop().animate({top:  0},t, function(){
			this.state = 'opened';
		});
	},
	close : function(t){
		this.$navbar.stop().animate({top:  - this.$navbar.height()},t,function(){
			this.state = 'closed';
		});
	}
};

