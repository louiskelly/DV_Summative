/*jshint esversion: 6 */
function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
}

//lisa code 

//HOME PAGE JS 
$("#scrollbutton").click(function() {
    $('html,body').animate({
        scrollTop: $(".conB").offset().top},
        'slow');
});

//TAB FUNCTION

function openTab(tabName) {
    var i;
    var x = document.getElementsByClassName("tab");
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";  
    }
    document.getElementById(tabName).style.display = "block";  
}

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

$("#mapbutton").click(function(){
    $("#map-modal").modal({
       fadeDuration: 200,
       width: 4000
    });
});

//when an article is clicked, show details on map modal
$("article").click(function(){
    $("#map-modal").modal({
       fadeDuration: 200,
       width: 4000
    });

map.setZoom(15);
map.setCenter(marker2.getPosition());


});




//Louis Code
$(".viewmap").click(function(){
    $("#map-modal").modal({
       fadeDuration: 200,
       width: 4000
    });
});

//MAP
var latlngCurrent = {
      lat: -41.27897451,
      lng: 174.77970593
    };

if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            latlngCurrent = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
          });
        }

var map;
var service;
var infowindow;

var gmarkers = [];
var arrayAll = ['restaurant','lodging','point_of_interest'];
var arrayRestaurant = ['restaurant'];
var arrayLodging = ['lodging'];
var arrayInterest = ['point_of_interest'];
var marker2;

function initMap() {
  var wellington = new google.maps.LatLng(-41.2865,174.7762);
  var myLatLng = {lat: -25.363, lng: 131.044};

  marker2 = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: 'Hello World!'
        });

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
    type: ['photos','restaurant','lodging','point_of_interest']
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
        website: details.website_link,
        lat: place.geometry.viewport.b.b,
        lng: place.geometry.viewport.f.b
    });

    gmarkers.push(marker);

  google.maps.event.addListener(marker, 'click', function() {
    $('#back_img').attr('src','https://maps.googleapis.com/maps/api/streetview?size=600x300&location='+$(this)[0].lng+','+$(this)[0].lat+'&heading=100&pitch=28&scale=2&key=AIzaSyBzcNyeAQB2eOqCy57ZR8eTAEnq5UshQHU');
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

    var requestCurrentLoc = {
        origin: latlngCurrent,
        destination: $(this)[0].position,
        travelMode: google.maps.TravelMode.WALKING
};
        directionsService.route(requestCurrentLoc, function (response, status) {
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