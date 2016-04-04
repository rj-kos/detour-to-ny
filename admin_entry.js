var Vue = require('vue');
var $ 	= require('jquery');
var Dropzone = require('./public/admin/dropzone.js');
var admin_bp = require('./public/js/admin_bp.vue');
var admin_place = require('./public/js/admin_place.vue');
var admin_gallery = require('./public/js/admin_gallery.vue');



var vm = new Vue({
    
        el:'#admin_app',
        data:{
            currentView: 'place_panel'
        },
        methods:{

        	changeView:
        		function(newView){
        			this.currentView = newView;
        		},

        	makeDZ:
        		function(el_class){
        			new Dropzone('.' + el_class, {url:"/api/image_upload"});
        			console.log('makeDZ');
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