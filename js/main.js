$(document).ready(function () {

	//замена картинок
	$('img[data-fit="true"]').each(function(){
		var src = $(this).attr('src');
		var replacer = document.createElement('div');
		$(replacer).css('background-image', 'url('+src+')').addClass('image_fit_replacer');
		$(this).after(replacer);
		$(this).css('opacity', 0);
	});
	
	$('img[data-bg="true"]').each(function(){
		var src = $(this).attr('src');
		$(this).parent().css('background-image', 'url('+src+')');
		$(this).css('opacity', 0);
	}); 	


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
	}

	setCssScrollbarWidth();	

});