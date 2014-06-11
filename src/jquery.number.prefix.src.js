/*!
 * jQuery Number Prefix  - v0.0.0b
 * ------------------------
 * Developed by @b03ir4 & @musicompositor
 * Licensed under MIT (https://github.com/vimia/jquery-number-prefix/blob/master/LICENSE)
 * ---------------------------------------------
 * Fork us at @github https://github.com/vimia/jquery-number-prefix/
 * Found a bug? suggestion? Please open an issue at https://github.com/vimia/jquery-number-prefix/issues
!*/

if (typeof jQuery === 'undefined') { 
	// Alert users without jQuery instanced
	throw new Error('jQuery  is a jQuery Plugin, so it needs jQuery to work ;) ');
}

(function( $ ) {

	$.fn.numberPrefix = function(a) {
		var opts = $.extend({}, $.fn.numberPrefix.defaults, a);		
	    if (this.selector == "") {
	    	return format(a);
	    }
	    else {
	    	$(this).on(opts.event, function(){
	    		try {
	    			opts.before(this);
	    			source = $(this);
	    			$.each($(opts.target),function(){
						$(this).html(format(source.val()),0);
	    			});
	    			opts.success(this);
	    		}
	    		catch (e) {
	    			console.log(e);
	    			opts.error(e,this);	
	    		}
	    		finally {
	    			opts.finally(this);
	    		}
	    	});
	    	return this;
	    }
	};

	function format( n, i ) {
		i =  (i == undefined)  ? 0 : i ;
		var opts = $.fn.numberPrefix.defaults;
		var c = [opts.sK, opts.sM, opts.sG, opts.sT, opts.sE, opts.sP];
    	var d = (n / 100) / 10.0;
    	var isRound = (d * 10) % 10 == 0;
    	return (d < 1000 ? ((d > 99.9 || isRound || (!isRound && d > 9.99) ? d * 10 / 10 : d + "" ) + "" + c[i]) : format(d, i+1));
	}

	$.fn.numberPrefix.defaults = {
		sK:'K',
		sM:'M',
		sG:'G',
		sT:'T',
		sE:'E',
		sP:'P',

		event: 'keyup',
		target: '#number-prefix-target',

		before: function(){},
		success: function(){},
		error: function(){},
		finally: function(){},

		debug: 0
	};
})( jQuery );