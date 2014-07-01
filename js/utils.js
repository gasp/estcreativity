// console polyfill
(function (c) {
	'use strict';
	var prop, method,
		empty = {},
		dummy = function() {},
		properties = 'memory'.split(','),
		methods = ('assert,clear,constructor,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,'
		+ 'info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn').split(',');
	while (prop = properties.pop()) c[prop] = c[prop] || empty;
	while (method = methods.pop()) c[method] = c[method] || dummy;
})(window.console = window.console || {});