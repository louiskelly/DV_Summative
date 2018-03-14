//HOME PAGE JS (Lisa)
$("#scrollbutton").click(function() {
    $('html,body').animate({
        scrollTop: $(".conB").offset().top},
        'slow');
});


//slick slider for conC

$('.slider').slick({
	dots: true,
	infinite: true,
	speed: 500,
	fade: true,
	cssEase: 'linear',
	centerMode: true,
	autoplay: true,
	autoplaySpeed: 4000,
});