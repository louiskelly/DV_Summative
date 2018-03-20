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


var canMarkerFlip = true;

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
    type: ['photos','restaurant','lodging','point_of_interest']
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);
  
  /////////////// CODE BY LISA - RECOMMENDATION

  function reccomendedMarker(placeID){
  service.getDetails({
    placeId: placeID
  }, function(result, status) {
    if (status != google.maps.places.PlacesServiceStatus.OK) {
      alert(status);
      return;
    }
    var markernew = new google.maps.Marker({
      map: map,
      // icon:'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
      position: result.geometry.location
    });
  });
}
    function articleClick(lat2,lng2,placeID){
      $("#map-modal").modal({
       fadeDuration: 200,
       width: 4000
    });
      reccomendedMarker(placeID);
      map.setCenter({
        lat: lat2,
        lng: lng2
      }); // setCenter takes a LatLng object
      map.setZoom(20);
    }

//ACCOMMODATION
  $("#article1").click(function(){articleClick(-41.2808, 174.7790, "ChIJHyHsgCyuOG0RkzSiShRxHdg");});
  $("#article2").click(function(){articleClick(-41.2859, 174.7748, "ChIJ1_rEkNWvOG0RykVBybnn1hE");});
  $("#article3").click(function(){articleClick(-41.2867, 174.7729, "ChIJO16jDSqwOG0Rj65KgiwCGtg");});
  $("#article4").click(function(){articleClick(-41.2890, 174.7736, "ChIJ-ebcGNavOG0RcXskAngXPvY");});
  $("#article5").click(function(){articleClick(-41.2951, 174.7837 , "ChIJXbQIzdqvOG0RST42CSGkFzg");});
  $("#article6").click(function(){articleClick(-41.2896, 174.7771 , "ChIJUdQY79avOG0RrSc5-_4xdLY");});
//HOT SPOTS
  $("#article7").click(function(){articleClick(-41.2901, 174.7536, "ChIJmfs6nEKwOG0REKydJGLvAA8");});
  $("#article8").click(function(){articleClick(-41.3064, 174.8243, "ChIJuTBolXKvOG0RRyTJ00rgcXw");});
  $("#article9").click(function(){articleClick(-41.2851, 174.7781, "ChIJLyoZhNSvOG0R579NxQyM2YQ");});
  $("#article10").click(function(){articleClick(-41.2840, 174.7751, "ChIJldjIatWvOG0RUFmFbdJlLcw");});
  $("#article11").click(function(){articleClick(-41.3195, 174.7846, "ChIJSW__XPevOG0ROIAi_R-aY8E");});
  $("#article12").click(function(){articleClick(-41.2996, 174.7769, "ChIJG64B7N6vOG0RFSwMzNvuZrk");});
//RESTAURANTS
  $("#article13").click(function(){articleClick(-41.2246, 174.8759, "ChIJ4awdp5WrOG0RhwqFpvRKHrw");});
  $("#article14").click(function(){articleClick(-41.2901, 174.7859, "ChIJi2ZKKsivOG0RNc0_wCpSkdY");});
  $("#article15").click(function(){articleClick(-41.2844, 174.7790, "ChIJ1-ncZdOvOG0RMGb7aKZQCWM");});
  $("#article16").click(function(){articleClick(-41.2929, 174.7827, "ChIJjVJEDNCvOG0R3NHWJYKqcLU");});
  $("#article17").click(function(){articleClick(-41.2852, 174.7776, "ChIJ2xCtjdSvOG0R7EjE5B2gx9g");});
  $("#article18").click(function(){articleClick(-41.2810, 174.7785, "ChIJpxuCgSyuOG0RQe8f4QId_R0");});

/////////////// CODE BY LISA - RECOMMENDATION END

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
      // console.log(results[i]);
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

    if (canMarkerFlip == true) {
        flipCard();
        canMarkerFlip = false;
    }
  });
  });
}


//Flip Function

var cardTransitionTime = 500;

var $card = $('.js-card');
var switching = false;

$('.backbtn').click(function(){
  flipCard();
  canMarkerFlip = true;
  map.setZoom(15);
});

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