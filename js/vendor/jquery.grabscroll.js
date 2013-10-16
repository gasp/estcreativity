/*
 *	Project: simpleSlideShow
 *	Description: please do not use it, this is only an exercise
 *	Author: gaspard
 *	License: WTFPL
 */

;(function ( $, window, document, undefined ) {

	var that = this, // todo : do i use this ?, send douglas a postcard
		pluginName = 'grabScroll',
		defaults = {
			time: 5000,
			distance: null,
			grabber: '.floating',
			section: 'section',
			sectionHeight: 'full',
			sectionsNames: ["First touch","Don't touch this","A touch of", "Let us touch you","Touched","Get in touch"],
			snapping: true,
			snapSpeed: 500,
			snapInterval: 500,
			snapDistance: 100, // stick immediately
			snapDistanceSticky: 10, // stick immediately
			onScroll: function(){},
			onSnapComplete: function(){},
			onWindowEnter: function(){},
			onTarget: function(){},
			onCurrent: function(){}
		},
		$w = $(window),
		wh =  $w.height(),
		animated = false, // animated
		$drag =  null,
		cursor = {dragged : false, free: false},
		s = 0, // scroll amount
		t = null, // timeout
		$sections = [],
		offset = [],
		current = 0,
		target = 0;

	// The actual plugin constructor
	var GrabScroll = function( element, options ) {
		this.element = element;

		// jQuery's extend method
		this.options = $.extend( {}, defaults, options );

		this._defaults = defaults;
		this._name = pluginName;
		$drag = $(this.options.grabber)

//		console.log('global var g',window.g = this)
		this.init();
	}

	GrabScroll.prototype = {
		init: function() {
			this._setSectionHeight();
			this._setOffset();

			/*
			 as I am listening the $w(indow) element, 
			 i will loose context while calling this._onScroll
			 i have $w easily catchable from cache wherever i need it
			 that's why I cache this to that then bind it
			 */
			var that = this;
			$w.on('scroll', this._onScroll.bind(that) );
			$w.on('resize', this._onResize.bind(that) );
			cursor.free = true;

			//// debug
			$($drag).on('mousedown', function (e) {
				if(!animated){ // prevent grabbing during animation
					cursor.free = false;
					cursor.dragged = true; // we will be listening to mouse events
					$drag = $(e.target).addClass('active');
//					console.log('grabbed');
				}
				else console.log('already animated') // debug
			})
			$(document).on("mousemove", function(e) { // should be disactivated when not needed
				if (cursor.dragged) {
					y = e.clientY;
					that._dragMove(y);
			    }
			});

			$(document).on("mouseup", function (e) {
				if(cursor.dragged == true){
					// dragged = false; // i wll cheat here
//					console.log('released');
//					console.log('let\'s go to ',target)
					
					that._animateTo(target, function(){
//						console.log('callback from mouseup')
//this should undrag the cursor
// but pergaps after animating it
						cursor.dragged = false;
						that._setCursorFree();
					})
					
	/*				$("html, body").animate(
						{ scrollTop: $('#s'+targetSection).offset().top },
						1000
					);
	*/
					
				}
	
			});
			
			
			// set initial cursor horizontal pos
			$drag.css({
				'right': 'auto',
				'left': $w.width() - $drag.width() - (250) // to right
			});

		},
		_setSectionHeight: function(){

			if(this.options.sectionHeight == 'full')
				this.options.sectionHeight = wh = $(window).height();
			$sections =
				$(this.options.section).css({'min-height':this.options.sectionHeight});
		},
		_setOffset: function(){
			$.each($sections, function(i){
				offset[i] = $(this).offset();
			});
		},
		/**
		 * Window scroll event handler
		 * @return null
		 */
		_onScroll : function(){
			s = $w.scrollTop();

			this._setCursorPos();

			this._onScrollEnd();
//			_snapWindow();


			this.options.onScroll({s:s,sections:$sections});
			
			// notify on new window entering
			$.each($sections, function(i){
				var $this = $(this.options); //,
//				console.log($this.offset().top)
/*					isOnScreen = $this.isOnScreen();
				if(isOnScreen){
					if(!$this.data('onScreen')) options.onWindowEnter($this);
				}
				$this.data('onScreen', isOnScreen);
*/
			});

		},
		/**
		 * detects when the scroll ends
		 * a scroll end is when it hasn't been moved by manual scroll
		 * a scroll end is when it hasn't been moved by auto scroll
		 */
		_onScrollEnd : function(){
			// clear timeout if exists
			if(t){clearTimeout(t);}
			
			s = $w.scrollTop();
			t = window.setTimeout(function(previousScrollTop){
				animated = this._hasItBeenScrolling(s)
				this._snapSection();
			}.bind(this,s),100);
		},
		_hasItBeenScrolling : function(previousScrollTop){
//			console.log(previousScrollTop)
			return previousScrollTop != $w.scrollTop();
		},
		_snapSection : function(){
			//  this is shit shit shit

			//		console.log($sections[1].offset().top)
			// caching options
			var options = this.options,
				that = this;
			$.each($sections, function(i){
				
				if(s == offset[i].top){
					that._setCurrent(i);
					return;
				}

				// if I am really close, stick immediately
				if(
					Math.abs(s - offset[i].top) < options.snapDistanceSticky // reminder: offset is a global
					&& !animated // there is no animation running
				){ 
					$("html, body").scrollTop(offset[i].top);
					
//					console.log('I immediately sticked !, not animated (',animated,')');
					current = i;
					return;
				}

				// if I am in the vincinity, 
				if(Math.abs(s-offset[i].top) < options.snapDistance){
					
					// cache this section
					var currentSection = this;
//					console.log('I should animate',options.snapSpeed)
					that._animateTo(i,function(){
						console.log('callback works from snap')
					})
					/*$('html:not(:animated),body:not(:animated)')
						.animate(
							{scrollTop: 0}, 
							options.snapSpeed
						);
					*/
				}
			});
/*
			// check for when user has stopped scrolling, & do stuff
			if(this.options.snapping){

					var $visibleWindow = _getCurrentWindow(), // visible window
						scrollTo = $visibleWindow.offset().top, // top of visible window
						completeCalled = false;
					// animate to top of visible window
					$('html:not(:animated),body:not(:animated)')
						.animate(
							{scrollTop: scrollTo}, 
							options.snapSpeed, 
							function(){
								if(!completeCalled){
									if(t){clearTimeout(t);}
									t = null;
									completeCalled = true;
									options.onSnapComplete($visibleWindow);
								}
							}
					);
				}, options.snapInterval);
			} // options.snapping
*/
		},
		_animateTo: function(j, callback){
			var options = this.options,
				el = $sections[j];
			
			if(!animated){
				animated = true;
				$('html:not(:animated),body:not(:animated)')
					.animate(
						{scrollTop: offset[j].top}, 
						options.snapSpeed, 
						'linear',
						function(){
							if(t){clearTimeout(t);}
							t = null;
							animated = false;
							options.onSnapComplete(el);
							
							callback();
						}
				);
			}
		},
		_onResize: function(){
			this._setSectionHeight();
			this._setOffset();
//			console.log($(window).height(),offset);
			// snap ?
		},
		_getCursorPos: function(){
			var scrolled = $w.scrollTop(),
				total = $(document).height(),
				wh = $w.height();

			return Math.min(Math.floor(scrolled/total*wh),wh-100);
		},
		_setCursorPos: function(){
			if(!animated || !cursor.dragged){ //|| !cursor.free
				$($drag).css({
					'top': this._getCursorPos(),
					'position':'fixed',
				})
			}

		},
		_setCursorFree: function(){
			$drag.removeClass('active').css({'position':'fixed'}).html('');
			cursor.draggable = true;
		},
		_cursorAnimate: function(){
			if(!animated){
				animated = true;
				$drag.animate({'top': this._getCursorPos()},1000,'linear',function(){
					
				})
			}
			else console.log('can\'t place cursor while animated');
		},
		_dragGrab: function(){
			
		},
		_dragDrop: function(){
			
		},
		_dragMove: function(y){
			var numberOfSections = offset.length,
				posy = Math.max(0,Math.min(y-25,wh-(2*25))),
				ctarget = Math.round(y/wh*numberOfSections)
			if(ctarget != target){
				this._setTarget(ctarget);
			}

		/*	$('.floating .inner').html(
//				'y' + y + '/' + wh + '<br>' +
//				'go to ' + ctarget + '/' + numberOfSections 
				this.options.sectionsNames[ctarget]
			);
			console.log(this.options.sectionsNames[ctarget])
		*/	
			$drag.css({
				top: posy
			}).html(this.options.sectionsNames[ctarget]);	
		},
		_setCurrent: function(i){
			current = Math.min(i,offset.length-1);
			this.options.onCurrent(i);
//			console.log('current',i)
		},
		_setTarget: function(i){
			target = Math.min(i,offset.length-1);
			this.options.onTarget(i);
//			console.log('target',i);
		}

	};
	


	///////
    


/*    var _onResize = function(){
		// i am resized
        _snapWindow();
    };
*/

    var _snapWindow = function(){
        // clear timeout if exists
        if(t){clearTimeout(t);}
        // check for when user has stopped scrolling, & do stuff
        if(this.options.snapping){
            t = setTimeout(function(){
                var $visibleWindow = _getCurrentWindow(), // visible window
                    scrollTo = $visibleWindow.offset().top, // top of visible window
                    completeCalled = false;
                // animate to top of visible window
                $('html:not(:animated),body:not(:animated)').animate({scrollTop: scrollTo }, options.snapSpeed, function(){
                    if(!completeCalled){
                        if(t){clearTimeout(t);}
                        t = null;
                        completeCalled = true;
                        options.onSnapComplete($visibleWindow);
                    }
                });
            }, options.snapInterval);
        }
    };
	////////





	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function ( options ) {
		return this.each(function () {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new GrabScroll( this, options ));
			}
		});
	};

})( jQuery, window, document );