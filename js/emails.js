//
//  emails.js
//  est
//  in included in the desktiop version (est.js) and the mobile one (est-mobile.js)
//

var emails = {};
emails.init = function(){
	var that = this,
		$contactmail = $('section.sec5 .encart .email');
	$('.reach a.email').each(function(){
		that.set(this)
	});
	$contactmail.html(that.set($contactmail));
};
emails.set = function(o){
	var e = $(o).data('email').toString() + '@estcreativity.com';
	var a = 'mailto:' +  e;
	$(o).attr({'href': a});
	return e;
}