var Vue = require('vue');
var $ 	= require('jquery');
var Dropzone = require('./public/admin/dropzone.js');
var admin_bp = require('./public/js/admin_bp.vue');
var admin_place = require('./public/js/admin_place.vue');
var admin_gallery = require('./public/js/admin_gallery.vue');



var vm = new Vue({
    
        el:'#admin_app',
        data:{
            currentView: 'place_panel',
            activePage: {
                place_panel: true,
                bp_panel: false,
                img_panel: false
            }
        },
        methods:{

        	changeView:
        		function(newView){

                    var that = this;

                    for(var key in that.activePage){
                                if(key==newView){
                                    that.activePage[key] = true;
                                }
                                else{
                                    that.activePage[key] = false;
                                }
                            }

                    $('.adminFormHolder').addClass('animated bounceOutLeft').on('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', 
                        function() {

                            console.log('working');
    
        			     that.currentView = newView;
        
                            
                        });

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
            //getBPs:
            //function(){
            //    this.$http.get('/api/blog').then(function(blogposts){
            //        this.blogposts = blogposts.data;
            //    }, function (response) {
            //        console.log('error');
            //});
            //}
        },
        components: {
        	bp_panel:admin_bp,
        	place_panel:admin_place,
        	img_panel:admin_gallery
        }
    });