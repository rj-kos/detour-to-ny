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
               adaptiveHeight: true
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

