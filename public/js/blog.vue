<template>

    <div class="container center">
        <div class="blog_post_wrap">
            <div class="row blogpostholder center" v-for="blogpost in blogposts">
                <a v-link="{path:'/blog/' + blogpost._id}">
                    <img :src="'/uploads/' + blogpost.featureImage">
                </a>
                <a v-link="{path:'/blog/' + blogpost._id}">
                    <h2 class="post_title">{{blogpost.title}}</h2>
                </a>
                <h3 class="post_place">{{blogpost.placename}}</h3>
                <h4 class="post_date">{{blogpost.date}}</h4>
            </div>
        </div>
    </div>

</template>

<script>

export default {

        data:
            function(){
                return {
                    blogposts:[],
                    places:{}
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
            getBPs:
                function(){
                    console.log('running');
                    this.$http.get('/api/blog').then(function(blogposts){

                        for(var i = 0; i < blogposts.data.length; i++){

                            var date = new Date(blogposts.data[i].date);
                            var d = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
                            blogposts.data[i].date = d;

                            blogposts.data[i].placename = this.places[blogposts.data[i].placeid];
                        }

                        this.blogposts = blogposts.data;
                    }, function (response) {
                        console.log('error');
                });
                }        
            },

        ready () {
            this.buildPlacesDict();
            
        },
        watch:{
            'places':
                function(val,oldVal){
                    this.getBPs();
                },
            'blogposts':
                function(val,oldVal){
                    
                }
        }

}

</script>

