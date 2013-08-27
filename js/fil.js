var fil = {
	$el: $(".filconducteur"),
	init: function () {
		window.setTimeout(function(){
			app.refresh();
			this.$el.height(app.dh).fadeIn()
		}.bind(this),200)
	}
}
$(window).on("load",function(){
	fil.init()
})
