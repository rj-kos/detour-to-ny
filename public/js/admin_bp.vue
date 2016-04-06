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
                            <select>
                                <option selected="true" disabled="disabled">Where is this post for?</option>
                                <option v-for="place in places" value="{{place._id}}">
                                    {{place.placename}}
                                </option>
                            </select>
                        </div>
                       <div class="row gen-margin-top center">
                            <div><b>POST TITLE</b></div>
                            <textarea rows="1" cols="20" class="bp_title_field" type="text" name="title" value=""></textarea>
                        </div>

                        <textarea class="editable gen-margin-top"></textarea>
                        <div class="row gen-margin-top center">
                            <input type="submit" value="Submit">
                        </div>
                    </form>
    
                    
        
                </div>
            </div>
        </div>
        <pre style="width:400px;">{{ $data | json }}</pre>
    </div>
    
</template>

<script>

var MediumEditor = require('medium-editor-webpack');


var Vue = require('vue');
Vue.use(require('vue-resource'));

export default {
    data: function() {
        return {
           places:[]
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
            }
    },

    ready () {
        var editor = new MediumEditor('.editable');
        this.getPlaces();
    }
   
}

</script>

