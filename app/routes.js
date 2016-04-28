var uuid = require('node-uuid');

var multer = require('multer');

var fs = require('fs');
var gm = require('gm').subClass({imageMagick: true});

var uploadDirectory = './public/uploads/';

var storage = multer.diskStorage({
  destination: uploadDirectory,
  filename: function (req, file, cb) {
    cb(null, uuid.v4() + '.jpg')
  }
});

var upload = multer( { storage:storage });
var Blog = require('./models/blogposts');
var Places = require('./models/places');
var Albums = require('./models/albums');
var Users = require('./models/users');
var Stats = require('./models/stats');

//Password salting and hashing
var bcrypt = require('bcrypt');
const saltRounds = 10;

//checkAuth middleware
function checkAuth(req, res, next) {

  Users.count({_id: req.session.userid}, function(err,count){
      if (!req.session.logged_in || count==0) {
        res.send('You are not authorized to view this page');
      } else {
        next();
      }

  });

}

    module.exports = function(app) {

      //get requests

        app.get('/api/blog', function(req, res) {
           
           Blog.find().sort({date: -1}).find(function(err, blogposts) {

               if (err)
                   res.send(err)

               res.json(blogposts); 
           });
        });

        app.get('/api/blog/:blogpost', function(req, res) {
           
           Blog.findOne({_id:req.params.blogpost},function(err, blogpost) {

               if (err)
                   res.send(err)

               res.json(blogpost); 
           });
        });

        app.get('/api/places', function(req, res) {
           
           Places.find(function(err, places) {

               if (err)
                   res.send(err)

               res.json(places); 
           });
        });

        app.get('/api/places/:place', function(req, res){

          Places.findOne({_id:req.params.place}, function(err,place){
              if(err)
                res.send(err)

              res.json(place);
          });

        });

        app.get('/api/places/:place', function(req, res) {
           
           Places.findOne({_id:req.params.place},function(err, place) {

               if (err)
                   res.send(err)

               res.json(place); 
           });
        });


        app.get('/api/images', function(req, res) {
           
           Albums.find().sort({date: -1}).find(function(err, albums) {


            //Albums.find().sort({date: 'desc'}).exec(function(err, docs) { ... });

               if (err)
                   res.send(err)

               res.json(albums); 
           });
        });

       app.get('/api/images/:place', function(req, res) {
           
           Albums.findOne({placeid:req.params.place},function(err, album) {

               if (err)
                   res.send(err)

               res.json(album); 
           });
        });

        app.get('/api/allimages',function(req,res){
          fs.readdir(uploadDirectory,function(err,files){
            if(err)
              res.send(err)

            res.json(files);
          });
        });

        app.get('/api/stats', function(req, res){
          Stats.find().distinct('statname', function(err, statnames) {
            if(err)
              res.send(err)

            res.json(statnames);
          });
        });

        app.get('/api/fullstats',function(req,res){
          Stats.find(function(err,stats){
            if(err)
              res.send(err)

            res.json(stats);
          });
        });


        //posts

        app.post('/api/places', checkAuth, function(req,res){

          //res.contentType('json');

          var place = new Places();
          if(req.body.placename)
            place.placename = req.body.placename;
          if(req.body.latitude)
            place.coordinates.x = req.body.latitude;
          if(req.body.longitude)
            place.coordinates.y = req.body.longitude;
          if(req.body.date)
            place.date = req.body.date;

          place.save(function(err){
            if (err)
              res.send(err);

            res.json({message: 'Place Created'});
          });

        });

        app.post('/api/stats', checkAuth, function(req,res){
          var stat = new Stats();
          if(req.body.statname)
            stat.statname = req.body.statname;
          if(req.body.number)
            stat.number = req.body.number;

          stat.save(function(err){
            if (err)
              res.send(err);

            res.json({message:'Stat Registered'});
          });

        });


        app.post('/api/blog', checkAuth, upload.single( 'file' ), function(req,res,next){
        
          console.log(req.file);
          console.log(req.body.placeid);

          var bp = new Blog();
          if(req.body.title)
            bp.title = req.body.title;
          if(req.body.content)
            bp.content = req.body.content;
          if(req.body.placeid)
            bp.placeid = req.body.placeid;
          if(req.file.filename)
            bp.featureImage = req.file.filename;

          bp.save(function(err){
            if (err)
              res.send(err);

            //res.json({message: 'Blog Post Created'});

            var fullImagePath = uploadDirectory + req.file.filename;

            gm(fullImagePath)
              .resize(1000)
              .noProfile()
              .write(fullImagePath, function (err) {
                if (!err) console.log('done');
              });

            return res.status( 200 ).send( req.file );
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

        app.post('/api/image_upload', checkAuth, upload.single( 'file' ), function(req,res,next){
        
          Albums.count({placeid: req.body.placeid}, function(err,count){
            if(count>0){
              Albums.update({placeid: req.body.placeid}, {$push: {imagepaths: req.file.filename}}, {upsert:true}, function(err){
              if(err){
                      console.log(err);
              }else{
                      console.log("Successfully added");
              }
            });
            }
            else{
              var album = new Albums();
              if(req.body.placeid)
                album.placeid=req.body.placeid;
              if(req.file.filename)
                album.imagepaths=[req.file.filename];

              album.save(function(err){
                if(err)
                  res.send(err);
              });

            }


          });          

            

          var fullImagePath = uploadDirectory + req.file.filename;

            gm(fullImagePath)
              .resize(1000)
              .noProfile()
              .write(fullImagePath, function (err) {
                if (!err) console.log('done');
              });

          return res.status( 200 ).send( req.file );

        });

        // route to handle delete goes here (app.delete)


        //login, create user, and logout routes
        app.post('/api/login', function (req, res) {
          var post = req.body;
          var response = res;

          Users.findOne({username:post.user},function(err, user) {

              if (err)
                  res.send(err)

              bcrypt.compare(post.password, user.password, function(err, res) {
                  if(res==true && user.confirmed==true){
                    req.session.userid = user._id;
                    req.session.logged_in = true;
                    response.redirect('/admin');
                  }
                  else {
                    response.send('Bad user/pass');
                  }
              });             

           });

        });

        app.post('/api/createusername', function(req,res){
          var post = req.body;
          bcrypt.hash(post.password, saltRounds, function(err, hash){
            var user = new Users();
              user.username = req.body.user;
              user.password = hash;

            user.save(function(err){
            if (err)
              res.send(err);

            res.json({message: 'Place Created'});
          });
          });

        });

        app.get('/api/logout', checkAuth, function (req, res) {
          delete req.session.logged_in;
          res.redirect('/login');
        });  

        // frontend routes =========================================================
        // route to handle all vue requests
        app.get('/login', function(req,res){
            res.sendfile('./public/login.html');
        });

        app.get('/createusername', function(req,res){
            res.sendfile('./public/createusername.html');
        });

        app.get('/admin', checkAuth,function(req,res){
            res.sendfile('./public/admin.html');
        });

        app.get('*', function(req, res) {
            res.sendfile('./public/index.html'); // load the public/index.html file
        });

    };
