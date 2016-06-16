$(document).ready(function(){
	
	$(document).foundation({
		equalizer: {
			equalize_on_stack: true
		}
	});
	
	$('.slick-slider').slick({
		autoplay: true,
		autoplaySpeed: 4000,
		dots: false,
		pauseOnHover: true,
		speed: 700,
		appendArrows: $(".slick-arrow-box"),
		prevArrow: "<i class='fa fa-arrow-left'></i>",
		nextArrow: "<i class='fa fa-arrow-right'></i>"
	});
	
	// Causes the model-search-tip to appear when a user selects a Make
	$('.make-search-element > select' ).bind('change', function() {
		$('.model-search-tip').show();
		$('.model-search-form').addClass('model-search-form-active');
	});
	
	if ($('.prode-combo-box > div').length > 1) {
		$('.combo-display').show();
	} else {
		$('.combo-display').hide();
	}
});