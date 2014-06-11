/*!
 * jQuery Number Suffix  - v0.0.0b
 * ------------------------
 * Developed by @b03ir4 & @musicompositor
 * Licensed under MIT (https://github.com/vimia/jquery-number-suffix/blob/master/LICENSE)
 * ---------------------------------------------
 * Fork us at @github https://github.com/vimia/jquery-number-suffix/
 * Found a bug? suggestion? Please open an issue at https://github.com/vimia/jquery-number-suffix/issues
!*/

if (typeof jQuery === 'undefined') { 
	// Alert users without jQuery instanced
	throw new Error('jQuery Number Suffix is a jQuery Plugin, so it needs jQuery to work ;) ');
}

(function( $ ) {	

	$.fn.numberSuffix = function(a) {
		var opts = $.extend({}, $.fn.numberSuffix.defaults, a);		
	    if (this.selector == "") {
	    	return format(a,opts);
	    }
	    else {
	    	$(this).on(opts.event, function(){
	    		try {
	    			opts.before(this);
	    			source = $(this);
	    			$.each($(opts.target),function(){
						$(this).html(format(source.val(),opts),0);
	    			});
	    			opts.success(this);
	    		}
	    		catch (e) {
	    			opts.error(e,this);	
	    		}
	    		finally {
	    			opts.finally(this);
	    		}
	    	});
	    	return this;
	    }
	};

	function round(n, p) {
	    var pr = Math.pow(10, p);
	    return Math.round(n*pr)/pr;
	}

	function format(n, opts) {
	    var base = Math.floor(Math.log(Math.abs(n))/Math.log(1000));
	    var suffix = opts.suffix[base-1];
	    suffix = suffix ? round(n / Math.pow(1000,base), 2) + suffix : '' + n;
	    return ((n > 1) ?  suffix + opts.unityPlural : suffix + opts.unity);
	}

	$.fn.numberSuffix.defaults = {
		suffix: 'KMGTEPY', // Kilo, Mega, Giga Tera 
		event: 'keyup',
		target: '#number-suffix-target',
		unity: '',
		unityPlural: '',
		before: function(){},
		success: function(){},
		error: function(){},
		finally: function(){},

		debug: 0
	};
})( jQuery );