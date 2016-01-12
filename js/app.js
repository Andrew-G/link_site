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
});