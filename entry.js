var Vue = require('vue');
Vue.use(require('vue-resource'));
require('./public/js/map.js');
var blog = require('./public/js/blog.vue');



new Vue({
    
        el:'#app',
        data:{
            blogposts: []
        },
        methods:{
            getBPs:
            function(){
                this.$http.get('/api/blog').then(function(blogposts){
                    this.blogposts = blogposts.data;
                }, function (response) {
                    console.log('error');
            });
            }
        },
        components: {
        	blogpost:blog
        }
    });