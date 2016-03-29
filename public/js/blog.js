var Vue = require('vue');
Vue.use(require('vue-resource'));

var vm = new Vue({
    
        el:'#app',
        data:{
            posts: []
        },
        methods:{
            getBPs:
            function(){
                this.$http.get('/api/blog').then(function(posts){
                    this.posts = posts.data;
                }, function (response) {
                    console.log('error');
            });
            }
        }
    });

    vm.getBPs();
