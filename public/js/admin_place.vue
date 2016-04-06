<template>
    <div class="container">
    	
    	<div class="adminFormHolder one-third push-one-third column center animated bounceInRight">

    		<div class="row">
        		<h2 class="gen-margin-top">Register a new place!</h2>
    		</div>
    		<div class="row">

    			<form>
    				<div class="row">Place Title (where are we?!?)</div>
  						<input type="text" name="placename" value="">
  					<div class="row gen-margin-top">
  						<button type="button" v-on:click="getLocation()">Get Coordinates</button>
  					</div>
  					<div class="row gen-margin-top">LATITUDE</div>
  						<input type="text" name="latitude" value="{{latitude}}"><br>
  					<div class="row gen-margin-top">LONGITUDE</div>
  						<input type="text" name="longitude" value="{{longitude}}"><br>
  					{{warning}}
  					<div class="row gen-margin-top">
  						<input v-on:click.prevent="consoleLog('hello')" type="submit" value="Submit">
  					</div>
    			</form>
	
    		</div>
    	</div>
    </div>
    
</template>

<script>


export default {
	data: function() {
		return {
			latitude:'',
			longitude:'',
			warning:''
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
				this.latitude = position.coords.latitude;
    			this.longitude = position.coords.longitude;	
			}
		}

	

    //props:['title','content']

    //data: function() {
    //    return {
    //    msg: 'Hello from vue-loader'
    //    }
    //}
}

</script>

