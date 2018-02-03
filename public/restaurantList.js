/*global $ */

// ============ Use the jquery.visible.js plug-in to animate products ================
// ============ Copyright (c) 2012 Digital Fusion, http://teamdf.com/ ================

	var win = $(window);

	var allMods = $(".rest-list-img");

	allMods.each(function(i, el) {
	    
	  if ($(el).visible(true)) {
	    $(el).addClass("deactivate"); 
	  }
	  
	});

	win.scroll(function(event) {
	  
	  allMods.each(function(i, el) {
	    
	    var el = $(el);
	    
	    if (el.visible(true)) {
	      el.addClass("activate"); 
	    } else {
	      el.removeClass("activate deactivate");
	    }
	    
	  });
	  
	});

// ==============================================================================