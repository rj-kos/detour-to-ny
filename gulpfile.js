'use strict';

var gulp 		= require('gulp');
var concatCss 	= require('gulp-concat-css');
var nodemon 	= require('gulp-nodemon');
var path		= require('path');
var sass		= require('gulp-sass');
var webpack		= require('webpack-stream');

gulp.task('css-concat',function(){

	return gulp.src(['./public/css/assets/normalize.css','./public/css/assets/lightbox.css','./public/css/assets/roadtrip_custom.css'])
		.pipe(concatCss('bundle.css'))
		.pipe(gulp.dest('./public/css/build/'));

});

gulp.task('lint',function(){

	console.log('lint');

});

gulp.task('sass', function () {
  return gulp.src('./public/css/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css/assets'));
});

gulp.task('webpack-build',function(){
	return gulp.src('./entry.js')
		.pipe(webpack( require('./webpack.config.js') ))
		.pipe(gulp.dest('./public/dist/'));
});


gulp.task('develop',function(){

	nodemon({
		legacyWatch:true,
		script:'server.js',
		ext: 'js css scss vue',
		tasks: function (changedFiles) {
    	var tasks = []
    		changedFiles.forEach(function (file) {
    		  if (path.extname(file) === '.js' && !~tasks.indexOf('webpack-build')) tasks.push('webpack-build')
    		  if (path.extname(file) === '.vue' && !~tasks.indexOf('webpack-build')) tasks.push('webpack-build')
    		  if (path.extname(file) === '.css' && !~tasks.indexOf('css-concat')) tasks.push('css-concat')
    		  if (path.extname(file) === '.scss' && !~tasks.indexOf('sass')) tasks.push('sass')
    		})
    	return tasks
  		},
		ignore: ['public/uploads','public/css/build/bundle.css', 'package.json', 'gulpfile.js', 'webpack.config.js', 'public/dist','public/admin/' ]
	})
	.on('restart',function(){
		console.log('Restarted');
	});

});

