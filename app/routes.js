var Blog = require('./models/blog');

    module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        // sample api route
        app.get('/api/blog', function(req, res) {
            // use mongoose to get all nerds in the database
           
           Blog.find(function(err, posts) {

               // if there is an error retrieving, send the error. 
                               // nothing after res.send(err) will execute
               if (err)
                   res.send(err)

               res.json(posts); // return all nerds in JSON format
           });
        });

        // route to handle creating goes here (app.post)
        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/index.html'); // load our public/index.html file
        });

    };
