var d3 = require('d3');
var $ = require('jquery');
var topojson = require('topojson');

 var projection = d3.geo.albersUsa()
    .translate([0,0])
    .scale(1);

    var path = d3.geo.path().projection(projection);

    var originalWidth = $('.map_holder').width();
    var height = originalWidth*0.631;

    var svg = d3.select(".map_holder").append("svg")
        .attr("width", "100%")
        .attr("height", height);

    var map = svg.append("g").attr("class","map");

    // read in US geometry
    var drawMap = function(){

        d3.json("../topo/us.json", function(error, topology) {

      // limit to continental US
      topology.objects.cb_2013_us_state_20m.geometries = 
        topology.objects.cb_2013_us_state_20m.geometries.filter(
            function(d){if(["Alaska", "Hawaii", "Puerto Rico"].indexOf(d.id) == -1){return d}}
            );

        var country = topojson.feature(topology, topology.objects.cb_2013_us_state_20m);
        var countryBB = path.bounds(country);
        var s = .95 / Math.max((countryBB[1][0] - countryBB[0][0]) / originalWidth, (countryBB[1][1] - countryBB[0][1]) / height);
        var t = [(originalWidth - s * (countryBB[1][0] + countryBB[0][0])) / 2, (height - s * (countryBB[1][1] + countryBB[0][1])) / 2];

    projection
        .scale(s)
        .translate(t);

      // attach path for US boundary
      map.append("path")
          .datum(topojson.feature(topology, topology.objects.cb_2013_us_state_20m))
          .attr("d", path)
          .attr('class','country');

          //you'll pull data into here
    var pathData = [[-77.053505, 38.910663],[-79.036203,35.923858],[-80.004820,32.778257],[-82.537949,35.593030],[-90.031, 29.981],[-97.712, 30.286]];

    var pathLine = d3.svg.line()  
        .interpolate("linear") 
        .x(function(d) { return projection(d)[0]; })  
        .y(function(d) { return projection(d)[1]; });  

    function pathTween() {
        var interpolate = d3.scale.quantile()
                .domain([0,1])
                .range(d3.range(1, pathData.length + 1));
        return function(t) {
            return pathLine(pathData.slice(0, interpolate(t)));
        };
    }
  
    var roadtripPath = map.append("path")
        .attr("fill","none")
        .attr("stroke-width","2px")
        //.attr("stroke", "#26C6DA")
        .attr("d",pathLine(pathData))  
        .attr("class","roadtripPath");

    var totalLength = roadtripPath.node().getTotalLength();

    roadtripPath
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
        .duration(pathData.length * 600)
        .ease("linear")
        .attr("stroke-dashoffset", 0);


    map.selectAll("circle")
        .data(pathData).enter()
        .append("circle")
        .attr("class", "placeCircles")
        //.attr("class","country")
        .attr("cx", function (d) { console.log(projection(d)); return projection(d)[0]; })
        .attr("cy", function (d) { return projection(d)[1]; })
        .attr("r", function(){return (originalWidth/100) + 'px'})
        ;

      });


        console.log('drawingMap');
    };

    drawMap();



    function sizeChange() {
        var newScale = $('.map_holder').width()/originalWidth;
        d3.select("g").attr("transform", "scale(" + newScale + ")");
        //proud of this next one
        d3.select("g").style("stroke-width",function(){return 1/newScale + 'px'});
        $("svg").height($(".map_holder").width()*0.64);
    }

    $( window ).resize(function(){sizeChange();});

    $('.collapsed_nav_link').click(function(){
        $('.mainNav').slideToggle();
    });