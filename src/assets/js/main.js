$(document).ready(function() {
  console.log('Decode is going ;)');

  $('.lesson-video').each(function() {
    createVideo($(this), $(this).data('video-config'));
  });
});
var Decode = {
    pages: {
        common: function() {
          $('.google-map').each(function() {
            var centre = new google.maps.LatLng(parseFloat($(this).data('lat')), parseFloat($(this).data('long')));
            var map = new google.maps.Map(this, {
              zoom: 15,
              center: centre,
              streetViewControl: false,
              mapTypeControl: false,
              styles: HS.mapStyle
            });

            var marker = new google.maps.Marker({
              position: centre,
              map: map,
              title: 'Location'
            });
          });

        $('.lesson-video').each(function() {
          createVideo($(this), $(this).data('video-config'));
        });
      },
      locations: function() {
        var markers = [];

        var centre = new google.maps.LatLng(0, 0);
        var map = new google.maps.Map($('.location-map')[0], {
          zoom: 1,
          center: centre,
          streetViewControl: false,
          mapTypeControl: false,
          styles: Decode.mapStyle
        });

        $('.location').each(function() {
          var $this = $(this),
              geoLocation = $this.data('location'),
              markerPos = new google.maps.LatLng(geoLocation.lat, geoLocation.long),
              marker = new google.maps.Marker({
                position: markerPos,
                map: map,
                title: $(this).children('h2').text()
              });

          google.maps.event.addListener(marker, 'click', function() {
            map.setZoom(15);
            map.setCenter(marker.getPosition());
            $('.locations-description').html($this.html());
          });



          markers.push(marker);
        });
      }

    },
    mapStyle: [
        {
            "featureType": "administrative",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                },
                {
                    "hue": "#0066ff"
                },
                {
                    "saturation": 74
                },
                {
                    "lightness": 100
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                },
                {
                    "weight": 0.6
                },
                {
                    "saturation": -85
                },
                {
                    "lightness": 61
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                },
                {
                    "color": "#5f94ff"
                },
                {
                    "lightness": 26
                },
                {
                    "gamma": 5.86
                }
            ]
        }
    ]
};

(function(){
    Decode.ready = function() {
        Decode.pages.common();
        var classes = $('body').attr('class').replace(/-/g, '_').split(/\s+/).forEach(function(item) {
            if (Decode.pages[item]) {
                Decode.pages[item]();
            }
        });
    };

    $(document).ready(Decode.ready);
})();
