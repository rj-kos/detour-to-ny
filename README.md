# detour-to-ny
A web-app for a roadtrip we took in May/June 2016

##Frontend
* Vue.js 1.0.20, D3 3.5,16
* Compiled with a gulp/webpack combo
* Written as a SPA because I felt like learning that...
* CSS written using SASS
* Frontend lives in "Public" directory, vue components live in "Public/js/"
 
##Backend
* Express.js 4.5.1, mongodb 3.2.4, mongoose 3.8.0
* Used multer 1.1 for large file uploads
* Used bcrypt 0.8.6 for password encryption (hash/salt)
* Backend lives in the "app" directory where its routes and models can be found
* Backend functions solely as an API and file store (images in this case), no rendering takes place on the server
