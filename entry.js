var Vue = require('vue');
Vue.use(require('vue-resource'));
require('./public/js/map.js');
var blog = require('./public/js/blog.vue');



new Vue({
    
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
        },
        components: {
        	post:blog
        }
    });