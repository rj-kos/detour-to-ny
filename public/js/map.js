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

    var aa = [-77.053505, 38.910663];
    var bb = [-90.031, 29.981];
    var cc = [-97.712, 30.286];

    map.selectAll("circle")
        .data([aa,bb,cc]).enter()
        .append("circle")
        //.attr("class","country")
        .attr("cx", function (d) { console.log(projection(d)); return projection(d)[0]; })
        .attr("cy", function (d) { return projection(d)[1]; })
        .attr("r", function(){return (originalWidth/100) + 'px'})
        .attr("fill", "#0097A7");
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