<template>

    <div class="container">       
        <div class="adminFormHolder two-thirds push-one-sixth column center animated bounceInDown">
            <div class="bp_wrap left">
                <div class="row center">
                    <h2 class="gen-margin-top">Write a new blog post!</h2>
                </div>
                <div class="row">    
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
                        <form action="/api/blog" class="dropzone" id="my-awesome-dropzone">   
                            <div class="dz-message">Select one photo as the blogpost banner image</div>
                            <input type="text" name="placeid" value="{{blogpost.placeid}}" style="display:none;">
                            <input type="text" name="title" value="{{blogpost.title}}" style="display:none;">
                            <input type="text" name="content" value="{{blogpost.content}}" style="display:none;">
                        </form>
                        <textarea class="editable gen-margin-top" v-model="blogpost.content"></textarea>
                        <div class="row gen-margin-top center">
                            <input v-on:click.prevent="submitPost(uploadDZ)" type="submit" value="Submit">
                        </div> 
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
            function(callback){
                if(this.blogpost.placeid != 'none'){
                    this.warning = '';

                     //have to do this because the medium-editor is instantiated apart from vue and I can't bind a v-model to it
                    this.blogpost.content = $('div.editable').html();

                    if(this.blogpost.content != ''){
                        setTimeout(function(){callback();}, 1000);
                    }
                }
                else{
                    this.warning = 'YOU MUST SELECTED A LOCATION!'
                }
            },

        uploadDZ:
            function(){
                this.$parent.$options.methods.activateDZUpload();
            }
    },

    route:{
      deactivate: function(transition){
        $('.adminFormHolder').addClass('animated bounceOutDown').on('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function() {
              transition.next();             
            });
        
        }
    },

    ready () {
        var editor = new MediumEditor('.editable');
        this.$parent.$options.methods.makeDZ('dropzone', {url:"/api/blog", autoProcessQueue: false, parallelUploads: 3, maxFiles:1});
        this.getPlaces();
    }
   
}

</script>

