<template>
    <div class="container">
    <h2 class="gallery_header">{{placename}}</h2>
        <div v-for="imageObj in album.imagepaths" class="row">
            <div class="half column place_gallery_image_holder center">
                <a :href="'./uploads/' + imageObj.firstPath" data-lightbox="roadtrip">
                    <img :src="'./uploads/' + imageObj.firstPath"> 
                </a>
            </div>
            <div class="half column place_gallery_image_holder center" v-if="imageObj.secondPath">
                <a :href="'./uploads/' + imageObj.secondPath" data-lightbox="roadtrip">
                    <img :src="'./uploads/' + imageObj.secondPath"> 
                </a>
            </div>
        </div>
    </div>
    <!--<pre v-cloak>{{ $data | json }}</pre>-->
</template>

<script>

var lightbox = require('../dist/lightbox.js');

export default {

    data:
    function(){
        return{
            album:[],
            placename:''
        }
    },

    methods:{
        getAlbum:
            function(){
                this.$http.get('/api/images/' + this.$route.params.place).then(function(album){
                    var newImagePaths = [];
                    var pathObj = {};
                    for(var i=0; i<album.data.imagepaths.length; i++){
                        if(i%2==0 && i==(album.data.imagepaths.length-1)){
                            pathObj.firstPath = album.data.imagepaths[i];
                            newImagePaths.push(pathObj);
                        }
                        else if(i%2==0){
                            pathObj.firstPath = album.data.imagepaths[i];
                        }
                        else {
                            pathObj.secondPath = album.data.imagepaths[i];
                            newImagePaths.push(pathObj);
                            pathObj={};
                        }
                    }
                    
                    album.data.imagepaths = newImagePaths;

                    this.album=album.data;
                },
                function (response) {
                            console.log('error');
                            });
            },
        getPlaceName:
            function(){
                this.$http.get('/api/places/' + this.$route.params.place).then(function(place){
                    this.placename = place.data.placename;
                },
                function(response){
                    console.log('error');
                });
            }

    },

    ready () {
        this.getAlbum();
        this.getPlaceName();
    }
}

</script>

