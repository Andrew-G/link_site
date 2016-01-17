$(document).foundation({
	equalizer: {
		equalize_on_stack: true
	}
});

$(document).ready(function(){
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
});