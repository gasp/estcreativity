//  analytics.js
// listens to elements set by menu.js (which should be renamed navigation.js)

//
var analytics = {
	init: function () {
		$("#nav").on("est:page", function(ev,options) {
			_gaq.push(['_trackPageview',location.pathname + location.search  + location.hash]);
		})
	},
};