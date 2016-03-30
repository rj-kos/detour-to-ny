var Vue = require('vue');
Vue.use(require('vue-resource'));

<template class="myTemplate">
<h1>HELLO WORLD</h1>
</template>

Vue.component('my-component',{
    template:'.myTemplate'
});


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

    //vm.getBPs();

