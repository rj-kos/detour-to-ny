<template>
    
    <div class="row home_image_section">
        <div class="container center">
            <div class="image_slider">
                <div class="slider_img_wrap" v-for="(index,image) in images">
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
                infinite: false,
                slidesToShow: 3,
                slidesToScroll: 1,
                responsive: [
                  {
                    breakpoint: 768,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 1,
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
        }
    }
}

</script>

