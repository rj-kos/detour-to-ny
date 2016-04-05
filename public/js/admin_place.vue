<template>
    <div class="container">
    	<div class="row">
        	<h1>Places</h1>
    	</div>
    	<div class="row">
    	<button v-on:click="getLocation()">Get Coordinates</button>
    	<p class="geo_position">Latitude: {{latitude}}  Longitude: {{longitude}}</p>
    	{{warning}}
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

