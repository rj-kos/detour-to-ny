<template>

    <div class="container">
        <div class="half push-one-fourth gallery_place_holder" v-for="album in albums">
            <a v-link="{path:'/gallery/' + album.placeid}">
                <img class="one column" :src="'./uploads/' + album.galMenuImg">
                <h3 class="gallery_place_title">{{album.placename}}</h3>
            </a>
        </div>
    </div>

</template>

<script>

export default {

        data:
            function(){
                return {
                    places:{},
                    albums:[]
                }
            },

        methods:{
            buildPlacesDict:
                function(){
                    this.$http.get('/api/places').then(function(places){

                        var dict = {};

                        for(var i = 0; i<places.data.length; i++){
                            
                            var id = places.data[i]._id;
                            var placename = places.data[i].placename;

                            dict[id] = placename;

                        }

                        console.log(dict);

                        this.places = dict;//places.data;

                       
                    }, function (response) {
                        console.log('error');
                    });
                },
            getAlbums:
                function(){
                    this.$http.get('/api/images').then(function(albums){

                        for(var i=0;i<albums.data.length;i++){
                            var id = albums.data[i].placeid;
                            var placename = this.places[id];
                            var galMenuImg = albums.data[i].imagepaths[Math.floor(Math.random() * (albums.data[i].imagepaths.length-1))];

                            albums.data[i].galMenuImg = galMenuImg;
                            albums.data[i].placename = placename;
                        }

                        this.albums=albums.data;
                    },
                    function (response) {
                                console.log('error');
                                });
                    } 
    
            },

        ready () {
            this.buildPlacesDict();
            
        },
        watch: {
            'places':
                function(newVal,oldVal){
                    this.getAlbums();
                }
        }

}

</script>

