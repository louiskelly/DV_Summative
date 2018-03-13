//Louis Code
$("#map-modal").modal({
   fadeDuration: 200,
   width: 4000
});

function initMap(){
	var uluru = {lat: -25.363, lng: 131.044};
	var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru
  });
}

$('.testBtn').click(function(){
	$( ".flip-container" ).toggleClass( "flip" );
});