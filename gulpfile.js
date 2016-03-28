'use strict';

var gulp 		= require('gulp');
var concatCss 	= require('gulp-concat-css');
var nodemon 	= require('gulp-nodemon');
var path		= require('path');
var sass		= require('gulp-sass');

gulp.task('css-concat',function(){

	return gulp.src(['./public/css/assets/normalize.css','./public/css/assets/roadtrip_custom.css'])
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



gulp.task('develop',function(){

	nodemon({
		legacyWatch:true,
		script:'server.js',
		ext: 'js css scss',
		tasks: function (changedFiles) {
    	var tasks = []
    		changedFiles.forEach(function (file) {
    		  if (path.extname(file) === '.js' && !~tasks.indexOf('lint')) tasks.push('lint')
    		  if (path.extname(file) === '.css' && !~tasks.indexOf('css-concat')) tasks.push('css-concat')
    		  if (path.extname(file) === '.scss' && !~tasks.indexOf('sass')) tasks.push('sass')
    		})
    	return tasks
  		},
		ignore: ['public/css/build/bundle.css', 'package.json', 'gulpfile.js']
	})
	.on('restart',function(){
		console.log('restarted');
	});

});

