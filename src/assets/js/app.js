;(($)=> {
	'use strict';

	$(window).on('load', function(){
		var map = null;

		function createMap() {

			var $markers = $('.ba-marker');

			map = new google.maps.Map( $('.ba-map')[0], {
				zoom: 14,
				center: new google.maps.LatLng(0,0),
				scrollwheel: false,
			});

			addMarkers($markers, map);
			centerMap($markers, map);

		}

		function addMarkers( $markers, map ) {
			$markers.each( function() {
				var lat = $(this).data('lat');
				var lng = $(this).data('lng');
				var icon = $(this).data('icon');
				var marker = new google.maps.Marker({
					position: { lat: lat, lng: lng },
					map: map,
					icon: icon,
				});

				var content = $(this).find('.description').html();

				var infoWindow = new google.maps.InfoWindow({
					content: content,
				});

				marker.addListener('click', function() {
					infoWindow.open(map, marker);
				});

			});
		}

		function centerMap($markers, map) {

			if ($markers.length == 1) {

				var lat = $markers.data('lat');
				var lng = $markers.data('lng');
				var latLng = new google.maps.LatLng( lat, lng );
				map.setCenter(latLng);

			} else { 

				var bounds = new google.maps.LatLngBounds();

				$markers.each( function() {
					var lat = $(this).data('lat');
					var lng = $(this).data('lng');
					var latLng = new google.maps.LatLng( lat, lng );
					bounds.extend(latLng);
				});

				map.fitBounds(bounds);

			}

		}

		createMap();
	});
	$('.ba-first-slider').slick(
	{
		infinite: true,
		slidesToShow: 1,
		dots:true,
		slidesToScroll: 1,
		slide: '.ba-first-slider__item',
		prevArrow: '.ba-first-slider__prev',
		nextArrow: '.ba-first-slider__next'
	});
	$('.ba-second-slider').slick({
		dots: true,
		infinite: true,
		speed: 300,
		slidesToShow: 3,
		slide: '.ba-second-slider__item',
		prevArrow: '.ba-second-slider__prev',
		nextArrow: '.ba-second-slider__next',
		slidesToScroll: 3,
		responsive: [
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				infinite: true,
				dots: true
			}
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				dots: true
			}
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
		]
	});

})(jQuery);
