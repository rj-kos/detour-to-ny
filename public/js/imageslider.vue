<template>
    
    <div class="row home_image_section">
        <div class="container">
            <div class="image_slider">
                <div class="slider_img_wrap" v-for="image in images">
                    <a :href="'./uploads/' + image" data-lightbox="roadtrip">
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

export default {

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
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
            });
        }
     }

    //data: function() {
    //    return {
    //    msg: 'Hello from vue-loader'
    //    }
    //}
}

</script>

