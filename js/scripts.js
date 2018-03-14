//Louis Code
$("#map-modal").modal({
   fadeDuration: 200,
   width: 4000
});

//MAP

var map;
var service;
var infowindow;

function initMap() {
  var wellington = new google.maps.LatLng(-41.2865,174.7762);

  map = new google.maps.Map(document.getElementById('map'), {
      center: wellington,
      zoom: 15
    });

  var request = {
    location: wellington,
    radius: '2000',
    type: ['restaurant']
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);


}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      // console.log(results[i]);
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {

    var marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        animation:google.maps.Animation.DROP,
        backTitle: place.name,
        backRating: place.rating,
        backAddress: place.vicinity,
        SideTester: place
    });


	google.maps.event.addListener(marker, 'click', function() {
		console.log($(this)[0]);
		console.log($(this)[0].SideTester);
		$('#back_title').text($(this)[0].backTitle);
		$('#back_rating').text($(this)[0].backRating);
		$('#back_address').text($(this)[0].backAddress);
		flipFunc();
	});
}


//END OF MAP

function flipFunc(){
	$( ".flip-container" ).toggleClass( "flip" );
}

$('.testBtn').click(function(){
	flipFunc();
});