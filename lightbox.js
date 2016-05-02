//////////
//
// A lightbox-plugin
//
//////////

// create a plugin
(function ($) {

	$.fn.lightBox = function (options) {

		// find images in the selected div
		return this.each(function() {

			// set variables
			var winHeight 		= $(window).innerHeight();
			var winWidth 		= $(window).innerWidth();
			var maxImageHeight 	= (winHeight / 1.5);
			var maxImageWidth 	= (winWidth / 1.5);
			console.log(winHeight);
			$(this).find('img').on('click', function() {

				// remove scrollbar
				$('body').css('overflow-y', 'hidden');

				// append a div over the whole page
				var overlay = $('<div id="lightbox-overlay"></div>')
					.css({'opacity' : '1', 'position' : 'fixed'})
					
					.appendTo('body')
					.show()
					.click(function() {
						removeLightBox();
					});

				$('<div></div>')
					.css({
						'display' : 'block',
						'position' : 'absolute',
						'top' : '0',
						'left' : '0',
						'width' : '100%',
						'height' : '100%',
						'background' : 'rgba(0, 0, 0, 0.5)',
						
					})
					.appendTo(overlay);

				// insert container for image
				$('<div id="lightbox-container"></div>')
					.hide()
					.appendTo(overlay);
				// insert image
				$('<img>')
					.attr('src', $(this).attr('src'))
					.css({
						'max-width' : maxImageWidth,
						'max-height' : maxImageHeight
					})
					.load(function() {
						positionImage();
					})
					.click(function() {
						removeLightBox();
					})				
					.appendTo('#lightbox-container');

				// insert caption
				$('<p></p>')
					.text($(this).attr('alt'))
					.appendTo('#lightbox-container');
					
			});

			// remove lightbox
			function removeLightBox() {
				$('#lightbox-container, #lightbox-overlay').fadeOut('slow', function() {
					$(this).remove();
					$('body').css('overflow-y', 'auto');
				});
			}

			// position lightbox-image
			function positionImage() {

				// position lightbox	
				$('#lightbox-container').fadeIn('slow');
			}

		});

	}
	


}(jQuery));

