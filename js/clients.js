var clients ={}
clients.$obj = {};
clients.init = function(){
	clients.$obj = $("section.sec4");
	$(".cinquante",clients.$obj).height(app.wh/2);
}

$(function(){
	clients.init();
})
