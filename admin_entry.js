var Vue = require('vue');

var VueRouter = require('vue-router');
Vue.use(VueRouter);

var $ 	= require('jquery');
var Dropzone = require('./public/admin/dropzone.js');
var admin_bp = require('./public/js/admin_bp.vue');
var admin_place = require('./public/js/admin_place.vue');
var admin_gallery = require('./public/js/admin_gallery.vue');
var admin_stats = require('./public/js/admin_stats.vue');

var AdminHome = Vue.extend({
    template: '<p>Select An Admin Panel!</p>'
})

var App = Vue.extend({
    
        methods:{

            changeView:
                function(value){
                    this.view = value;
                },

        	makeDZ:
        		function(el_class, options){

        			myDropzone = new Dropzone('.' + el_class, options);

                    myDropzone.on("queuecomplete", function() {
                        myDropzone.options.autoProcessQueue = false;
                    });

        			console.log('makeDZ');
        		},
            activateDZUpload:
                function(){
                    myDropzone.options.autoProcessQueue = true;
                    myDropzone.processQueue();
                } 
            
        },
        ready () {
    
        $('.collapsed_nav_link').click(function(){
            console.log('sliding');
            $('.mainNav').slideToggle();
            });
        }   
         
    });


    var router = new VueRouter();

    router.map({
        '/bp_panel': {
            component: admin_bp
        },
        '/place_panel': {
            component: admin_place
        },
        'img_panel':{
            component: admin_gallery
        },
        '':{
            component: AdminHome
        },
        '/stats_panel':{
            component:admin_stats
        }
    });

    router.start(App,'#admin_app');
