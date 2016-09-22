<template>

    <div class="container center">
        <div class="statHolder" v-for="displaystat in displaystats">
            {{displaystat.name}} : {{displaystat.number}}
        </div>    
    </div>

</template>

<script>

export default {

    data:
    function(){
        return{
            stats:{},
            displaystats:[]
        }
    },

    methods:{
        getCurrentStats:
            function(){
                this.$http.get('/api/statistics').then(function(statnames){
                    var stattitles = statnames.data;
                    for(var i=0;i<stattitles.length;i++){
                        var statObj = {};
                        statObj.name = stattitles[i];
                        statObj.number = this.stats[stattitles[i]];
                        this.displaystats.push(statObj);
                    }

                }, 
                function (response) {
                    console.log('error');
                });
            },
        getStats:
            function(){
                this.$http.get('/api/fullstatistics').then(function(stats){
                    var statistics = stats.data;
                    var rawStats = {};
                    for(var i=0; i<statistics.length;i++){
                        if(!rawStats[statistics[i].statname]){
                            rawStats[statistics[i].statname] = statistics[i].number;
                        }
                        else {
                            rawStats[statistics[i].statname] += statistics[i].number;
                        }
                    }
                    this.stats = rawStats;
                },
                function(response){
                    console.log('error');
                });
            },
        supplyStat:
            function(statname){
                return this.stats.statname;
            }
    },

    ready () {
        this.getStats();
    },
    watch:{
        'stats':
            function(val,oldval){
                this.getCurrentStats();
            }
    }
}

</script>

