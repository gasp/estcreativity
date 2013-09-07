var contacts ={}
contacts.$obj = {};
contacts.$mi = {};

contacts.init = function(){
	contacts.$obj = $("section.sec5");
	contacts.$mi =  $(".maps .inner",contacts.$obj);

	$("a",contacts.$mi).prop('target', '_blank').find("div").hover(
		function(){ //hover
			console.log(this)
			$(this).stop().fadeTo('slow', 0.95)
		},
		function(){ //out
			$(this).stop().fadeTo('slow', 1)
		}
	);


	var eh = $(".encart",contacts.$obj).height();
	var mh = app.wh - eh;

	$(".map",contacts.$mi).height(mh);
	$(".qua",contacts.$mi).height(mh);

	var mih = contacts.$mi.height();
	contacts.$mi.css({paddingTop:app.wh - mih})
	$(".maps",contacts.$obj).height(app.wh).width(app.ww).show();


}
