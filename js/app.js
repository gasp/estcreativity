app = {
	$w : {},
	wh : 0, // screen/window height;
	ww : 0, // screen/window width
	dh : 0, // body/document height


	refresh: function(){
		this.$w = $(window);
		this.wh = this.$w.height();
		this.ww = this.$w.width();
		this.dh = $(document).height();

		console.log("app>refreshed",app);
	},

	stellar: function(){
		$.stellar({
			responsive:true,
			horizontalScrolling: false
		});
	},

	init: function(){
		console.log('app>initialized');
		app.refresh();
		
		// unhide sections
		// cf est-layout.less
		// mus be done _before_ initializing other elemnets
		$('section').show();
		
		// here init all elements

		$(document).grabScroll();
		home.init();

		team.init();
		eyes.init();
		
		
		parallax.init();
		
		window.setTimeout(function(){
			app.stellar();
		},120)
	}
	
}


$(window).on("load", function(){
	app.init();
})


/*
	TODO delete this
		app.refresh is still needed because all isn't properly wired
		but eventually, it shall come
*/

$(function(){
	app.refresh();
});
app.refresh();
/*

var parallax = {
	$w : $(window),
	current : 'none',
	objects: {},

	cache: function(){
		var $howwework = $("#howwework"),
			$sugar = $(".sugar", $howwework),
			$fish01 = $(".fish01", $howwework);
			
			parallax.objects.sugar = {
				position: $sugar.position(),
				offset: $sugar.offset()
			}
		
			parallax.objects.fish01 = {
				position: $fish01.position(),
				offset: $fish01.offset()
			}
	},
	none : function(){},
	howwework : function(){
		var $howwework = $("#howwework"),
			$sugar = $(".sugar", $howwework),
			$fish01 = $(".fish01", $howwework);
		
		// when sugar is close to the bottom of the screen, it moves
		if(Math.abs(parallax.s + app.wh - 200 - parallax.objects.sugar.offset.top) < 50){
			var delta = Math.abs(parallax.s + app.wh - 200 - parallax.objects.sugar.offset.top);
			$sugar.css({top: parallax.objects.sugar.position.top + delta / 2});
			
//			console.log(
//				Math.abs(parallax.s + app.wh - 200 - $sugar.offset().top) ,
//				parallax.s,
//				$sugar.offset().top


		}
		
		if(Math.abs(parallax.s + app.wh - 200 - parallax.objects.fish01.offset.top) < 50){
			var delta = Math.max(0,parallax.s + app.wh - 200 - parallax.objects.fish01.offset.top);
			$fish01.css({left: parallax.objects.fish01.position.left + delta / 2});
			console.log(delta);
			
		}
			
	}
	
}

parallax.cache();
parallax.$w.on('scroll',function(e){
	parallax.s = parallax.$w.scrollTop();
	parallax[parallax.current].call()
	
});


/*jQuery(document).ready(function ($) {


    $(window).stellar({
		responsive:true,
		horizontalOffset: -900,
		horizontalScrolling: false,
		verticalOffset: 40
	});

    var links = $('.navigation').find('li');
    slide = $('.slide');
    button = $('.button');
    mywindow = $(window);
    htmlbody = $('html,body');


    slide.waypoint(function (event, direction) {

        dataslide = $(this).attr('data-slide');

        if (direction === 'down') {
            $('.navigation li[data-slide="' + dataslide + '"]').addClass('active').prev().removeClass('active');
        }
        else {
            $('.navigation li[data-slide="' + dataslide + '"]').addClass('active').next().removeClass('active');
        }

    });
 
    mywindow.scroll(function () {
        if (mywindow.scrollTop() == 0) {
            $('.navigation li[data-slide="1"]').addClass('active');
            $('.navigation li[data-slide="2"]').removeClass('active');
        }
    });

    function goToByScroll(dataslide) {
        htmlbody.animate({
            scrollTop: $('.slide[data-slide="' + dataslide + '"]').offset().top
        }, 2000, 'easeInOutQuint');
    }



    links.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);
    });

    button.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);

    });


});
*/

