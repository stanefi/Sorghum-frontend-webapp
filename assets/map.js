function initMapYield() {
  // Threshold of color change depending on the yield
  var value = 'Yield';
  const YIELD_THRESHOLD = [0,30,60,90];
  const COLOR = ['#ff8000','#ffff00','#bfff00','#40ff00'];
  const LEGEND_COLOR = ["#D8B28B", "#D8D88B", "#C4D88B", "#9ED88B"];

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

  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(
    document.getElementById('legend'));

    var legend = document.getElementById('legend');
    LEGEND_COLOR.forEach(function(elem, index){
      var div = document.createElement('div');
      div.style="background-color:"+elem+"; width:40px; height:40px; text-align:right; padding:3px";
      div.innerHTML = YIELD_THRESHOLD[index];
      legend.appendChild(div);
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
      }]
    });
    layer.setMap(map);
  }

  function initMapSeeds() {
    // Threshold of color change depending on the yield
    var value = 'Seeds';
    const YIELD_THRESHOLD = [0,10000,15000,20000];
    const COLOR = ['#ff8000','#ffff00','#bfff00','#40ff00'];
    const LEGEND_COLOR = ["#D8B28B", "#D8D88B", "#C4D88B", "#9ED88B"];

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

    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(
      document.getElementById('legend'));

      var legend = document.getElementById('legend');
      LEGEND_COLOR.forEach(function(elem, index){
        var div = document.createElement('div');
        div.style="background-color:"+elem+"; width:40px; height:40px; text-align:right; padding:3px";
        div.innerHTML = YIELD_THRESHOLD[index];
        legend.appendChild(div);
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
        }]
      });
      layer.setMap(map);
    }
