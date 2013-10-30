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

		var title = document.title;
		console.log(title);
		console.log($('body'));
		
		$('#nav').on('est:page', function (ev,options) {
			document.title = options.text + ' | ' + title;
			ev.stopPropagation();
		});

		// hiding or displaying menu
		$("body>section.sec1").waypoint(function(direction){
			if(direction == "down") menu.$navbar.stop().fadeIn()
			else menu.$navbar.stop().fadeOut();
		});

		// activating the menu element
		$('body>section').each(function(i){
//			if(!i) return; // would disactivate first section, but we need this for analytics
			$(this).waypoint(function (direction) {
				$('.sep',menu.$navbar).removeClass('active');
				var $sep,
					prev = Math.max(i-1,0);

				if(direction == "down") $sep = $($('.sep',menu.$navbar)[i]);
				else $sep = $($('.sep',menu.$navbar)[prev]);
//				console.log('waypoint %d called %s : %s', i, direction, $sep.text());
				$sep.addClass('active');

				$('#nav').trigger('est:page', [{text: $sep.text(), id: i}]);
			});
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
		this.$navbar.stop().animate({top:  0},t);
		this.state = 'opened';
	},
	close : function(t){
		this.$navbar.stop().animate({top:  - this.$navbar.height()},t);
		this.state = 'closed';

	}
};

