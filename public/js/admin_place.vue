<template>
    
    <div class="container">
    	<div class="adminFormHolder one-third push-one-third column center animated bounceInDown">
    		<div class="row">
        		<h2 class="gen-margin-top">Register a new place!</h2>
    		</div>
    		<div class="row">
    			<form>
    				<div class="row">Place Title (where are we?!?)</div>
  						<input type="text" name="placename" v-model="place.placename">
  					<div class="row gen-margin-top">
  						<button type="button" v-on:click="getLocation()">Get Coordinates</button>
  					</div>
  					<div class="row gen-margin-top">LATITUDE</div>
  						<input type="text" name="latitude" v-model="place.latitude"><br>
  					<div class="row gen-margin-top">LONGITUDE</div>
  						<input type="text" name="longitude" v-model="place.longitude"><br>
  					{{warning}}
  					<div class="row gen-margin-top">
  						<input v-on:click.prevent="submitPlace()" type="submit" value="Submit">
  					</div>
    			</form>
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
			place: {
				placename:'',
				latitude:'',
				longitude:'',
				warning:''
			}
		}
	},
	methods:{
		consoleLog:
			function(arg){
				console.log(arg);
			},
		getLocation:
			function(){
				if (navigator.geolocation) {
        			navigator.geolocation.getCurrentPosition(this.showPosition);
    				} 
    				else { 
        				this.warning = "Geolocation is not supported by this browser.";
    				}
			},
		showPosition:
			function(position){
				this.place.latitude = position.coords.latitude;
    			this.place.longitude = position.coords.longitude;	
			},
		submitPlace:
			function(){
				this.$http.post('/api/places', this.place)
					.then(function(success){console.log(success)}, function(err){console.log(err)});
			}
		},
    route:{
      deactivate: function(transition){
        $('.adminFormHolder').addClass('animated bounceOutDown').on('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function() {
              transition.next();             
            });
        
      }
    }
}

</script>

