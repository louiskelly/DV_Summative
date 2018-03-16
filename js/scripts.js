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
    var detailmake = service.getDetails({placeId: place.place_id}, function(place2){
      console.log(place2);
      // var details = {
      //   detail_description: place2.description;
      // }
    });

    var marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        animation:google.maps.Animation.DROP,
        backTitle: place.name,
        backRating: place.rating,
        backAddress: place.vicinity,
        SideTester: place,
        category: place.types,
        backImage: place.photos.reference
    });

    gmarkers.push(marker);

  google.maps.event.addListener(marker, 'click', function() {
    console.log($(this)[0]);
    console.log($(this)[0].category);
    $('#back_img').attr('src','https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference='+ $(this).backImage +'&key=AIzaSyBzcNyeAQB2eOqCy57ZR8eTAEnq5UshQHU');
    $('#back_title').text($(this)[0].backTitle);
    //Gather Rating number, converts to stars
    $('#back_rating').text($(this)[0].backRating);
    $('span.stars').stars();
    //
    $('#back_address').text($(this)[0].backAddress);
    flipCard();
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