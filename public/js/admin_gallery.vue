<template>
    <div class="container">  
        <div class="adminFormHolder two-thirds push-one-sixth column center animated bounceInDown">
            <div class="row">
                <h2 class="gen-margin-top">Got new pics!??!</h2>
            </div>
            <div class="row center">
                <div><b>LOCATION</b></div>
                <select v-model="selectedPlace">
                    <option selected="true" disabled="disabled" value="none">Where are these pics from?</option>
                    <option v-for="place in places" value="{{place._id}}">
                        {{place.placename}}
                    </option>
                </select>
            </div>
            <div class="row gen-margin-top">

                <form action="/api/image_upload" class="dropzone" id="my-awesome-dropzone">   
                    <input type="text" name="placeid" value="{{selectedPlace}}" style="display:none;">
                </form>
                <div class="row gen-margin-top">
                    <input type="submit" value="Submit" v-on:click="dzUpload()"> 
                    <br>{{warning}}
                </div> 
            </div>
        </div>
    </div>
    
</template>

<script>
var Vue = require('vue');
Vue.use(require('vue-resource'));

var $ = require('jquery');

export default {

    data: function() {
        return {
           places:[],
           selectedPlace:'',
           warning:''
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
        dzUpload:
            function(){
                if(this.selectedPlace != 'none'){
                    this.warning = '';
                    this.$parent.$options.methods.activateDZUpload();
                }
                else{
                    this.warning = 'YOU MUST SELECTED A LOCATION!'
                }
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
        this.$parent.$options.methods.makeDZ('dropzone', {url:"/api/image_upload", autoProcessQueue: false, parallelUploads: 3});
        this.getPlaces();
    }
}

</script>

