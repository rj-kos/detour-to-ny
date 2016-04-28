var Vue = require('vue');
Vue.use(require('vue-resource'));

var VueRouter = require('vue-router');
Vue.use(VueRouter);
//require('./public/js/map.js');
var home = require('./public/js/home.vue');
var blog = require('./public/js/blog.vue');
var blogpost = require('./public/js/blogpost.vue');
var gallery = require('./public/js/gallery.vue');
var gallery_place = require('./public/js/gallery_place.vue');
var about = require('./public/js/about.vue');
var stats = require('./public/js/stats.vue');

var $ = require('jquery');



var App = Vue.extend({

        //components: {
        //	blogpost:blog,
        //    home:home
        //    
        //},
        ready () {
    
        $('.collapsed_nav_link').click(function(){
            console.log('sliding');
            $('.mainNav').slideToggle();
            });

        $('.nav_link a, .nav_logo').click(function(){
            if($('.mainNav').css('display')=='block' && $(window).width()<768){
                $('.mainNav').slideToggle();
                }
            });
        }
//,
        //watch : {
        //     'images':
        //         function(val,oldVal) {
        //             $('.your-class').slick({
        //               infinite: true,
        //               //lazyLoad:'ondemand',
        //               slidesToShow: 3,
        //               slidesToScroll: 1
        //            });
        //     }
        //}
    });

    //App.$watch('images',function(value,mutation){
    //       $('.your-class').slick({
    //           infinite: true,
    //           //lazyLoad:'ondemand',
    //           slidesToShow: 3,
    //           slidesToScroll: 1
    //        });
    //});

    var router = new VueRouter({
        history: true
    });

    router.map({
        '': {
            component: home
        },
        '/blog': {
            component: blog
        },
        '/blog/:blogpost': {
            component:blogpost
        },
        '/gallery':{
            component:gallery
        },
        '/gallery/:place':{
            component:gallery_place
        },
        '/stats':{
            component:stats
        },
        '/about':{
            component:about
        }
        //  '/user/:username': {
        //    component: {
        //    template: '<p>username is {{$route.params.username}}</p>'
        //    }
        //},

    });

    router.start(App,'#app');
