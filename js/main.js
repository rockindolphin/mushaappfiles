function setCssScrollbarWidth(){
	// Create the measurement node
	var scrollDiv = document.createElement("div");
	scrollDiv.className = "scroll__measure";
	document.body.appendChild(scrollDiv);

	// Get the scrollbar width
	var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

	// Delete the DIV 
	document.body.removeChild(scrollDiv);

	//Set css custom property value
	var body = document.querySelector('body');
	body.style.setProperty('--scrollbar-width', scrollbarWidth+'px');
	if( scrollbarWidth > 0 ){
		$('.scroll--hidden').each(function(){
			$(this).css({
				marginRight: -scrollbarWidth
			});
		});			
	}
	return scrollbarWidth;
}

$(document).bind('mobileinit', function(){
	$.extend(  $.mobile , {
		defaultPageTransition: 'flip'
	});
});

$(document).on( 'pageshow', function(e) {
	//pagecreate->pageinit->pageshow
	setCssScrollbarWidth();	
	
	$('img[data-bg="true"]').each(function(){
		var src = $(this).attr('src');
		$(this).parent().css('background-image', 'url('+src+')');
		$(this).css('opacity', 0);
	}); 	
		
});

