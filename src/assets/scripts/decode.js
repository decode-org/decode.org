var $ = require('jquery');

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

          $('.old-lesson-video').each(function() {
            createVideo($(this), $(this).data('video-config'));
          });

          $('.lesson-video').each(function() {
            console.log(this);
            new DecodeVideo(this);
          });

          $('.menu-button').click(function() {
            $('body').toggleClass('menu-active');
          });

          $('.general-contact').each(function(event) {
            var form = $(this),
                name = form.find('input[name="name"]'),
                email = form.find('input[name="_replyto"]'),
                url = form.attr('action'),
                response = form.find('.response');


            $(this).submit(function(event) {
              event.preventDefault();
              var data = form.serializeObject();

              if (!data.name) {
                response.text('Please enter your name').addClass('error').removeClass('success');
                return;
              }

              if ((!data._replyto) || (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(data._replyto))) {
                response.text('Please enter a valid email address').addClass('error').removeClass('success');
                return;
              }

              data._subject = data._subject.replace('//NAME//', data.name);

              response.text('Pending...').removeClass('error').removeClass('success');
              form.find('input[type="submit"]').prop('disabled', true);

              var timeout = false;

              //Prevent the spamming with a 5s timeout
              setTimeout(function() {
                if (timeout) {
                  form.find('input[type="submit"]').prop('disabled', false);
                }
                timeout = true;
              }, 5000);

              $.ajax({
                url: url,
                method: "POST",
                data: data,
                dataType: 'json',
                success: function(data) {
                  response.text('Thank you for your message').removeClass('error').addClass('success');
                },
                error: function(error) {
                  response.text('Something went wrong. Please try again or email decode@decode.org.nz.').addClass('error').removeClass('success');
                },
                complete: function() {
                  if (timeout) {
                    form.find('input[type="submit"]').prop('disabled', false);
                  }
                  timeout = true;
                }
              });
            });
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

var DecodeVideo = Decode.DecodeVideo = require('./video');


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

window.Decode = module.exports = Decode;
