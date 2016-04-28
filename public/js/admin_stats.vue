<template>
    <div class="container">
    	
    	<div class="adminFormHolder one-third push-one-third column center animated bounceInDown">

    		<div class="row">

    			<form>
    				<div class="row">What's the stat?!</div>
  						<select v-model="statname">
                    <option selected="true" disabled="disabled" value="none">Select a stat or create a new one!</option>
                    <option v-for="currentstatname in currentstatnames" value="{{currentstatname}}">
                        {{currentstatname}}
                    </option>
                    <option value="createnewstat">Create A New Stat</option>
              </select>
  					<div v-show="newStat" class="row gen-margin-top">New Stat Name</div>
  						<input v-show="newStat" type="text" name="statname" v-model="stat.statname"><br>
  					<div class="row gen-margin-top">Stat Number</div>
  						<input type="text" name="number" v-model="stat.number"><br>
  					<div class="row gen-margin-top">
  						<input v-on:click.prevent="submitStat()" type="submit" value="Submit">
  					</div>
    			</form>
	
    		</div>
    	</div>
      <!--<pre v-cloak>{{ $data | json }}</pre> -->
    </div>
    
</template>

<script>

var $ = require('jquery');


export default {
	data: function() {
		return {
      statname:'',
      newStat:false,
      currentstatnames:[],
			stat: {
				statname:'',
				number:0
			}
		}
	},
	methods:{
    getCurrentStats:
      function(){
          this.$http.get('/api/stats').then(function(stats){
              this.currentstatnames = stats.data;
              console.log(stats.data);
          }, function (response) {
              console.log('error');
              });
    },
		submitStat:
			function(){
				this.$http.post('/api/stats', this.stat)
					.then(function(success){console.log(success)}, function(err){console.log(err)});
			}
		},
    route:{
      deactivate: function(transition){
        $('.adminFormHolder').addClass('animated bounceOutDown').on('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function() {
              transition.next();             
            });
        
      }
    },
    ready() {
      this.getCurrentStats();
    },
    watch:{
      'statname':
        function(val,oldVal){
          if(val == 'createnewstat'){
            this.stat.statname = '';
            this.newStat=true;
          }
          else {
            if(val != 'none'){
              this.stat.statname = val;
            }
            this.newStat=false;
          }
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

