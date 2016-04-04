var uuid = require('node-uuid');

var multer = require('multer');

var storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: function (req, file, cb) {
    cb(null, uuid.v4() + '.jpg')
  }
});

var upload = multer( { storage:storage });
var Blog = require('./models/blogposts');
var Places = require('./models/places');
var Albums = require('./models/albums');

    module.exports = function(app) {

      //get requests

        app.get('/api/blog', function(req, res) {
           
           Blog.find(function(err, blogposts) {

               if (err)
                   res.send(err)

               res.json(blogposts); 
           });
        });

        app.get('/api/places', function(req, res) {
           
           Places.find(function(err, places) {

               if (err)
                   res.send(err)

               res.json(places); 
           });
        });


        //posts

        app.post('/api/places', function(req,res){
          var place = new Places();
          if(req.body.placename)
            place.placename = req.body.placename;
          if(req.body.coordinatex)
            //var coordinates = req.body.coordinates;
            place.coordinates.x = req.body.coordinatex;
          if(req.body.coordinatey)
            place.coordinates.y = req.body.coordinatey;
          if(req.body.date)
            place.date = req.body.date;

          place.save(function(err){
            if (err)
              res.send(err);

            res.json({message: 'Place Created'});
          });

        });

       //app.post('/api/albums', function(req,res){
       //  var album = new Albums();
       //  album.save(function(err){
       //    if (err)
       //      res.send(err);

       //    res.json({message: 'Album Created'});
       //  });

       //});

        //

        app.post('/api/image_upload', upload.single( 'file' ), function(req,res,next){
        
          console.log(req.file);
          return res.status( 200 ).send( req.file );

        });

        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all vue requests

        app.get('/admin',function(req,res){
            res.sendfile('./public/admin.html');
        });

        app.get('*', function(req, res) {
            res.sendfile('./public/index.html'); // load the public/index.html file
        });

    };
