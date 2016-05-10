function initMapYield() {
  // Threshold of color change depending on the yield
  var value = 'Yield';
  const YIELD_THRESHOLD = [0,10,20,30,40,50,60,70,80,90];
  const COLOR = ['#ff0000','#ff4000','#ff8000','#ffbf00','#ffff00','#dfff00','#bfff00','#80ff00','#40ff00','#00ff00'];

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
        { hue: "#ffffff" },
        { saturation: 0 }
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
        fillColor: '#FFFFFF',
        fillOpacity: 0.3
      }
    }, {
      where: value+' > '+YIELD_THRESHOLD[0],
      polygonOptions: {
        fillColor: COLOR[0]
      }
    }, {
      where: value+' > '+YIELD_THRESHOLD[1],
      polygonOptions: {
        fillColor: COLOR[1]
      }
    }, {
      where: value+' > '+YIELD_THRESHOLD[2],
      polygonOptions: {
        fillColor: COLOR[2]
      }
    }, {
      where: value+' > '+YIELD_THRESHOLD[3],
      polygonOptions: {
        fillColor: COLOR[3]
      }
    }, {
      where: value+' > '+YIELD_THRESHOLD[4],
      polygonOptions: {
        fillColor: COLOR[4]
      }
    }, {
      where: value+' > '+YIELD_THRESHOLD[5],
      polygonOptions: {
        fillColor: COLOR[5]
      }
    }, {
      where: value+' > '+YIELD_THRESHOLD[6],
      polygonOptions: {
        fillColor: COLOR[6]
      }
    }, {
      where: value+' > '+YIELD_THRESHOLD[7],
      polygonOptions: {
        fillColor: COLOR[7]
      }
    }, {
      where: value+' > '+YIELD_THRESHOLD[8],
      polygonOptions: {
        fillColor: COLOR[8]
      }
    }, {
      where: value+' > '+YIELD_THRESHOLD[9],
      polygonOptions: {
        fillColor: COLOR[9]
      }
  }]
});
layer.setMap(map);
}

function initMapSeeds() {
  // Threshold of color change depending on the yield
  var value = 'Seeds';
  const YIELD_THRESHOLD = [0,500,1000,1500,2000,2500,3000,3500,4000,4500];
  const COLOR = ['#ff0000','#ff4000','#ff8000','#ffbf00','#ffff00','#dfff00','#bfff00','#80ff00','#40ff00','#00ff00'];

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
        { hue: "#ffffff" },
        { saturation: 0 }
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
        fillColor: '#FFFFFF',
        fillOpacity: 0.3
      }
    }, {
      where: value+' > '+YIELD_THRESHOLD[0],
      polygonOptions: {
        fillColor: COLOR[0]
      }
    }, {
      where: value+' > '+YIELD_THRESHOLD[1],
      polygonOptions: {
        fillColor: COLOR[1]
      }
    }, {
      where: value+' > '+YIELD_THRESHOLD[2],
      polygonOptions: {
        fillColor: COLOR[2]
      }
    }, {
      where: value+' > '+YIELD_THRESHOLD[3],
      polygonOptions: {
        fillColor: COLOR[3]
      }
    }, {
      where: value+' > '+YIELD_THRESHOLD[4],
      polygonOptions: {
        fillColor: COLOR[4]
      }
    }, {
      where: value+' > '+YIELD_THRESHOLD[5],
      polygonOptions: {
        fillColor: COLOR[5]
      }
    }, {
      where: value+' > '+YIELD_THRESHOLD[6],
      polygonOptions: {
        fillColor: COLOR[6]
      }
    }, {
      where: value+' > '+YIELD_THRESHOLD[7],
      polygonOptions: {
        fillColor: COLOR[7]
      }
    }, {
      where: value+' > '+YIELD_THRESHOLD[8],
      polygonOptions: {
        fillColor: COLOR[8]
      }
    }, {
      where: value+' > '+YIELD_THRESHOLD[9],
      polygonOptions: {
        fillColor: COLOR[9]
      }
  }]
});
layer.setMap(map);
}
