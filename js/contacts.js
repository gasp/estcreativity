var contacts ={}
contacts.$obj = {};
contacts.init = function(){
	contacts.$obj = $("section.sec5");


	window.setTimeout(function(){
		var $mi =  $(".maps .inner",contacts.$obj),
			eh = $(".encart",contacts.$obj).height();
		
		var mh = app.wh - eh;
		
		$(".maps .inner .m0").height(mh);
		$(".maps .inner .q0").height(mh/2);
		$(".maps .inner .q1").height(mh/2);
		
		var mih = $mi.height();
		$mi.css({paddingTop:app.wh - mih})
		$(".maps",contacts.$obj).height(app.wh).width(app.ww).show();

	}.bind(this),1200);

}

$(function(){
	contacts.init();
})
