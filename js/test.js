jQuery(function($){
	l = function(a) {
		console.log(a);	
	};
	
	var a = 0, b = 22, c = 45, d = 9;
	
	// (if a<0 or b<0) {ding=c} else {ding=a}
	var ding = a || b ? c : a;
	
	a || b ? l(d) : l(a);
	
});