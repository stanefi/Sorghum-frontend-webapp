function initMap() {

  // Threshold of color change depending on the yield
  const YIELD_THRESHOLD = [10,20,30,40];

  // Specify features and elements to define styles.
  var styleArray = [
    {
      featureType: "all",
      stylers: [
       { saturation: -80 }
      ]
    },{
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        { hue: "#00ffee" },
        { saturation: 50 }
      ]
    },{
      featureType: "poi.business",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    }
  ];

  // Create a map object and specify the DOM element for display.
  // Kansas coords 38.7477906,-98.1153956,7.63z
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 38.7477906, lng: -98.1153956},
    scrollwheel: false,
    // Apply the map style array to the map.
    styles: styleArray,
    zoom: 8
  });

  var layer = new google.maps.FusionTablesLayer({
  query: {
    select: 'geometry',
    from: '1Y9uZoziwVdbsHS9G7zU98ePYTaIweG0XOZneOqLB'
  },
  styles: [{
    polygonOptions: {
      fillColor: '#00FF00',
      fillOpacity: 0.3
    }
  }, {
    where: 'Yield > 10',
    polygonOptions: {
      fillColor: '#0000FF'
    }
  }, {
    where: 'Yield > 20',
    polygonOptions: {
      fillColor: '#00FF00'
    }
  }, {
    where: 'Yield > 30',
    polygonOptions: {
      fillColor: '#FF0000'
    }
  }, {
    where: 'Yield > 40',
    polygonOptions: {
      fillColor: '#FF00FF'
    }
  }]
});
layer.setMap(map);

}
