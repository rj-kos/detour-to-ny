<template>

    <div class="container center">
        <div class="blog_post_wrap">
            <div class="row blogpostholder left">
                <img :src="'/uploads/' + blogpost.featureImage">
                    <div class="blogpost_info_wrap">
                        <h2 class="post_title">{{blogpost.title}}</h2>
                        <h3 class="post_place">{{blogpost.placename}}</h3>
                        <h4 class="post_date">{{blogpost.date}}</h4>
                    </div>
                <div>
                {{{blogpost.content}}}
                </div>
            </div>
        </div>
    </div>
    <imageslider :images="album.imagepaths"></imageslider>
</template>

<script>

var imageslider = require('./imageslider.vue');

export default {

    data:
    function(){
        return{
            blogpost:[],
            album:[]
        }
    },
    components:{
        imageslider:imageslider
   },

    methods:{
        getBP:
            function(){
                
                this.$http.get('/api/blog/' + this.$route.params.blogpost).then(function(blogpost){

                    this.$http.get('/api/places/' + blogpost.data.placeid).then(function(placename){

                        var date = new Date(blogpost.data.date);
                        var d = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
                        blogpost.data.date = d;

                        blogpost.data.placename = placename.data.placename;

                        this.blogpost = blogpost.data;
                        }, function (response) {
                            console.log('error');
                            });
                    }, function (response) {
                        console.log('error');
                        });
                },
        getAlbum:
            function(){
                this.$http.get('/api/images/' + this.blogpost.placeid).then(function(album){
                    this.album=album.data;
                },
                function (response) {
                            console.log('error');
                            });
            } 

    },

    ready () {
        this.getBP();
    },
    watch:
        {
            'blogpost':
                function(val,oldVal){
                    this.getAlbum();
                },
        }


}

</script>

