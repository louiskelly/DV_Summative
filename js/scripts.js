/*jshint esversion: 6 */

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

//Louis Code
$("#map-modal").modal({
   fadeDuration: 200,
   width: 4000
});

//MAP
if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            console.log(pos)
          })
        }

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
      zoom: 15,
       styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#222222'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
    });

  var request = {
    location: wellington,
    radius: '2000',
    type: ['restaurant','lodging','point_of_interest']
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);
  // service.getDetails({placeId: placeidVar}, function(place) {console.log(place);
  // });

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
    var detailmake = service.getDetails({placeId: place.place_id}, function(place2, status){
    var details = {};
    var hasWebsite;
      console.log(status);
      if (place2 && place2.website){
        details = {
          website_link : place2.website
        };
      hasWebsite = true; 
      } else {
      hasWebsite = false; 
      }

    var marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        animation:google.maps.Animation.DROP,
        backTitle: place.name,
        backRating: place.rating,
        backAddress: place.vicinity,
        SideTester: place,
        category: place.types,
        backImage: place.photos[0].getUrl({'maxWidth': 400, 'maxHeight': 400}),
        website: details.website_link,
        latlng: place.geometry.location
    });

    console.log(marker.backImage);

    gmarkers.push(marker);

  google.maps.event.addListener(marker, 'click', function() {
    console.log($(this)[0]);
    console.log($(this)[0].category);
    $('#back_img').attr('src','http://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference='+ $(this).backImage +'&key=AIzaSyBzcNyeAQB2eOqCy57ZR8eTAEnq5UshQHU');
    $('#back_title').text($(this)[0].backTitle);
    //Gather Rating number, converts to stars
    $('#back_rating').text($(this)[0].backRating);
    $('span.stars').stars();
    //
    $('#back_address').text($(this)[0].backAddress);
    if (hasWebsite == true){
    $('#back_website').attr('href', ($(this)[0].website));
    $('.back-website-style').show();
    } else {
      $('.back-website-style').hide();
    }

    //
    var latlngtest = {
      lat: -41.27897451,
      lng: 174.77970593
    };

    var request = {
        origin: latlngtest,
        destination: $(this)[0].latlng,
        travelMode: google.maps.TravelMode.WALKING
};
        directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            directionsDisplay.setOptions({
                suppressMarkers: true
            });
        } else {
            console.log("directionsService : " + status);
        }
    });
    //


    flipCard();
  });
  });
}


//Flip Function

var cardTransitionTime = 500;

var $card = $('.js-card');
var switching = false;

$('#testBtn').click(flipCard);

function flipCard () {
   if (switching) {
      return false;
   }
   switching = true;
   
   $card.toggleClass('is-switched');
   window.setTimeout(function () {
      $card.children().children().toggleClass('is-active');
      switching = false;
   }, cardTransitionTime / 2);
}

//Star Function
$.fn.stars = function() {
    return $(this).each(function() {
        // Get the value
        var val = parseFloat($(this).html());
        // Make sure that the value is in 0 - 5 range, multiply to get width
        var size = Math.max(0, (Math.min(5, val))) * 16;
        // Create stars holder
        var $span = $('<span />').width(size);
        // Replace the numerical value with stars
        $(this).html($span);
    });
};