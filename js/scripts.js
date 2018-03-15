//Louis Code
$("#map-modal").modal({
   fadeDuration: 200,
   width: 4000
});

//MAP

var map;
var service;
var infowindow;

var gmarkers = [];
var arrayAll = ['restaurant','lodging','point_of_interest'];
var arrayRestaurant = ['restaurant'];
var arrayLodging = ['lodging'];
var arrayInterest = ['point_of_interest'];

function initMap() {
  var wellington = new google.maps.LatLng(-41.2865,174.7762);

  map = new google.maps.Map(document.getElementById('map'), {
      center: wellington,
      zoom: 15
    });

  var request = {
    location: wellington,
    radius: '2000',
    type: ['restaurant','lodging','point_of_interest']
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);

  function setMapOnAll(map) {
        for (var i = 0; i < gmarkers.length; i++) {
          gmarkers[i].setMap(map);
        }
      }
  function clearMarkers() {
        setMapOnAll(null);
      }
  function deleteMarkers() {
        clearMarkers();
        gmarkers = [];
      }


    function filterMarkerType(){
    deleteMarkers();
    service.nearbySearch(request, callback);
  }

  $('.mapBtn_Lodging').click(function(){
    request.type = arrayLodging;
    filterMarkerType();
  });

  $('.mapBtn_Restaurant').click(function(){
    request.type = arrayRestaurant;
    filterMarkerType();
  });

  $('.mapBtn_Interest').click(function(){
    request.type = arrayInterest;
    filterMarkerType();
  });
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
        SideTester: place,
        category: place.types
    });

    gmarkers.push(marker);

	google.maps.event.addListener(marker, 'click', function() {
		console.log($(this)[0]);
		console.log($(this)[0].category);
		$('#back_title').text($(this)[0].backTitle);
		$('#back_rating').text($(this)[0].backRating);
		$('#back_address').text($(this)[0].backAddress);
		flipFunc();
	});
}

// filterMarkers = function (category) {
//     for (i = 0; i < gmarkers.length; i++) {
//         marker1 = gmarkers[i];
//         // If is same category or category not picked
//         if (marker1 == category[i] || category.length === 0) {
//             marker1.setVisible(true);
//         }
//         // Categories don't match 
//         else {
//             marker1.setVisible(false);
//         }
//     }
// };


//END OF MAP

function flipFunc(){
	$( ".flip-container" ).toggleClass( "flip" );
}

$('.testBtn').click(function(){
	flipFunc();
});