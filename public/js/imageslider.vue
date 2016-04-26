<template>
    
    <div class="row home_image_section">
        <div class="container center">
            <div class="image_slider">
                <div class="slider_img_wrap" v-for="(index,image) in images">
                    <a :href="'./uploads/' + image" :data-lightbox="getRand(index)">
                        <img :src="'./uploads/' + image" >
                    </a>
                </div>
            </div>
        </div>      
    </div>

</template>

<script>

var $ = require('jquery');

var lightbox = require('../dist/lightbox.js');

var slick = require('../dist/slick/slick.min.js');

    lightbox.option({
      'albumLabel':'',
      'disableScrolling':true,
    });

export default {

    methods:{
        getRand:
            function(index){
                return index * Math.random();
            }
    },

    props:['images'],


    watch : {
     'images':
         function(val,oldVal) {
             $('.image_slider').slick({
               infinite: true,
               //lazyLoad:'ondemand',

 
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
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

        //$('div.slider_img_wrap').children('a').filter(function(){
          //  return $(this).parent().attr('data-slick-index') >= 0;
        //}).attr("data-lightbox","roadtrip");

        }
     }
}

</script>

