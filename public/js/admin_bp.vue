<template>
    <div class="container">
        
        <div class="adminFormHolder two-thirds push-one-sixth column center animated bounceInRight">
            <div class="bp_wrap left">
                <div class="row center">
                    <h2 class="gen-margin-top">Write a new blog post!</h2>
                </div>
                <div class="row">
    
                    <form id="blogpost_form">
                        <div class="row center">
                            <div><b>LOCATION</b></div>
                            <select v-model="blogpost.placeid">
                                <option selected="true" disabled="disabled" value="none">Where is this post for?</option>
                                <option v-for="place in places" value="{{place._id}}">
                                    {{place.placename}}
                                </option>
                            </select>
                        </div>
                       <div class="row gen-margin-top center">
                            <div><b>POST TITLE</b></div>
                            <textarea rows="1" cols="20" class="bp_title_field" type="text" name="title" v-model="blogpost.title"></textarea>
                        </div>

                        <textarea class="editable gen-margin-top" v-model="blogpost.content"></textarea>
                        <div class="row gen-margin-top center">
                            <input v-on:click.prevent="submitPost()" type="submit" value="Submit">
                        </div>
                    </form>
    
                    
        
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>

var MediumEditor = require('medium-editor-webpack');

var Vue = require('vue');
Vue.use(require('vue-resource'));

var $ = require('jquery');

export default {
    data: function() {
        return {
           places:[],
           blogpost: {
            title:'',
            content:'',
            placeid:''
           }
        }
    },

    methods:{
        getPlaces:
            function(){
                this.$http.get('/api/places').then(function(places){
                    this.places = places.data;
                    console.log(places.data);
                }, function (response) {
                    console.log('error');
                });
            },
        submitPost:
            function(){
                this.blogpost.content = $('div.editable').html();

                this.$http.post('/api/blog', this.blogpost)
                    .then(function(success){console.log(success)}, function(err){console.log(err)});
            }
    },

    ready () {
        var editor = new MediumEditor('.editable');
        this.getPlaces();
    }
   
}

</script>

