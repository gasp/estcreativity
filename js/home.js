// 
//  home.js
//  estcreativity
//  
//  Created by gaspard on 2013-09-07.
//  Copyright 2013 gaspard. All rights reserved.
// 

home = {};

home.init = function(){
	$(".sec0 .social .sbadge").each(function(i){
		$(this).click(function(){
			window.location.href = $(this).data("link");
		})
	});
}