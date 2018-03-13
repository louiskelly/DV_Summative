//HOME PAGE JS (Lisa)
$("#scrollbutton").click(function() {
    $('html,body').animate({
        scrollTop: $(".conB").offset().top},
        'slow');
});