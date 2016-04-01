var Blog = require('./models/blogposts');
var Places = require('./models/places');

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



        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all vue requests
        app.get('*', function(req, res) {
            res.sendfile('./public/index.html'); // load the public/index.html file
        });

    };
