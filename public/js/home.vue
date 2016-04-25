<template>

    <div class="container">
        <div class="row">
            <div class="one column map_holder"></div>
        </div>
    </div>

    <imageslider :images="sliderimages"></imageslider>

    <!--<pre v-cloak>{{ $data | json }}</pre>-->

</template>

<script>

var d3 = require('d3');
var $ = require('jquery');
var topojson = require('topojson');

var imageslider = require('./imageslider.vue');

export default {
   data: function() {
       return {
          places:[],
          images:[],
          sliderimages:[],
          blogpost: {
           title:'',
           content:'',
           placeid:''
          }
       }
   },

   methods:{
        getSliderImages:
            function(){
                this.$http.get('/api/allimages').then(function(images){
                    this.sliderimages = images.data;
                }, function(response) {
                    console.log('error');
                });
            },
        getPlaces:
            function(){
                this.$http.get('/api/images').then(function(images){
                    this.images = images.data;
                    console.log(images.data);

                    this.$http.get('/api/places').then(function(places){
                        this.places = places.data;
                        console.log(places.data);
                    }, function (response) {
                        console.log('error');
                    });

                }, function (response) {
                    console.log('error');
                });
                
            },

        buildMap:
            function(mapData, tooltipImages){

                function findImagePath(place_id){
                    for(var i = 0 ; i < tooltipImages.length ; i++){
                        if(tooltipImages[i].placeid == place_id) {
                            var imageIndex = Math.floor(Math.random() * (tooltipImages[i].imagepaths.length-1));
                            console.log(imageIndex);
                            return tooltipImages[i].imagepaths[imageIndex];
                        };
                    }
                }

                function insertTooltipPlace(place, id){

                    $('.map_tt_title').text(place);
                    $('.map_tt a').attr('href', '/gallery/'+id);
 
                }

                function insertTooltipImg(image){
                    
                    var _image = new Image();
                    _image.src = "./uploads/" + image;
                    $(_image).load(function(){
                        $(".tt_img_loader").css("display","none");
                        $(".tt_img_holder").html(_image);
                    });

                }
                

                var tooltip = d3.select("body")
                    .append("div")
                    .style("position", "absolute")
                    .style("z-index", "10")
                    .style("display", "none")
                    .text("a simple tooltip")
                    .attr("class","map_tt_wrap")
                    .html('<div class="map_tt"><a><div class="map_tt_title"></div><div class="tt_img_wrap"><div class="tt_img_holder"></div><div class="tt_img_loader"><img src="./img/oval.svg"></div></div></a></div>');
            

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
            
                      //you'll pull data into here [[-77.053505, 38.910663],[-79.036203,35.923858],[-80.004820,32.778257],[-82.537949,35.593030],[-90.031, 29.981],[-97.712, 30.286]];
                var pathData = mapData;
            
                var pathLine = d3.svg.line()  
                    .interpolate("linear") 
                    .x(function(d) { return projection([d.coordinates.y , d.coordinates.x])[0]; })  
                    .y(function(d) { return projection([d.coordinates.y , d.coordinates.x])[1]; });  
            
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
                    .attr("cx", function (d) { console.log(projection([d.coordinates.y , d.coordinates.x])); return projection([d.coordinates.y , d.coordinates.x])[0]; })
                    .attr("cy", function (d) { return projection([d.coordinates.y , d.coordinates.x])[1]; })
                    .attr("r", function(){return (originalWidth/100) + 'px'})
                    .on("mouseover", function(d){
                        $(".tt_img_holder").html('');
                        insertTooltipPlace(d.placename,d._id);
                        insertTooltipImg(findImagePath(d._id));
                        $(".tt_img_loader").css("display","block");
                        return $('.map_tt_wrap').stop().fadeIn().css({"display":"block", "top": (event.pageY+10)+"px", "left":ttipX()})})
                    //.on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
                    .on("mouseout", function(){return $('.map_tt_wrap').stop().fadeOut();});
                    ;

                function ttipX(){
                    if($(window).width() - event.pageX > 210) {
                        return (event.pageX+10) + "px";
                    } 
                    else {
                        return (event.pageX - 210) + "px";
                    }
                };

            
                $('.map_tt_wrap').stop().hover(function(){
                    console.log('hovering');
                    $(this).stop(true).fadeIn();
                    },
                    function(){
                       $(this).fadeOut();
                    });
//
                  });


                    
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
            

            }
   },

   watch : {
        'places':
            function(val,oldVal) {
                this.buildMap(val, this.images);
        }
   },

   components:{
        imageslider:imageslider
   },

   ready () {
    this.getPlaces();
    this.getSliderImages();

    //$('.collapsed_nav_link').click(function(){
    //    console.log('sliding');
    //    $('.mainNav').slideToggle();
    //    });
    }
  
}

</script>