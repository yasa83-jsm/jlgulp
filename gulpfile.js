// ////////////////////////////////////////////////
// Included taskes
// gulp build
// bulp build:remove
// // /////////////////////////////////////////////


var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var compass = require('gulp-compass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var del = require('del');
var rename = require('gulp-rename');



// ////////////////////////////////////////////////
// Scripts Tasks
// // /////////////////////////////////////////////

gulp.task('scripts', function(){	
	gulp.src(['app/js/**/*.js', '!app/js/**/*.min.js'])   
    .pipe(plumber())
    .pipe(rename({suffix: '.min'}))  
  	.pipe(uglify())  
	.pipe(gulp.dest('app/js/'))  
  	.pipe(reload({stream:true}));
});



// ////////////////////////////////////////////////
// Compass / Sass Tasks
// // /////////////////////////////////////////////

gulp.task('compass', function() {
  gulp.src('app/scss/style.scss')
    .pipe(plumber())
    .pipe(compass({
      config_file: './config.rb',
      css: 'app/css',
      sass: 'app/scss',
      require: ['susy']
    }))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('app/css/'))
    .pipe(reload({stream:true}));
});



// ////////////////////////////////////////////////
// HTML Tasks
// // /////////////////////////////////////////////

gulp.task('html', function(){
    gulp.src('app/**/*.html')
    .pipe(reload({stream:true}));
});




// ////////////////////////////////////////////////
// Build Tasks
// // /////////////////////////////////////////////

// clean out all files and folders from build folder
gulp.task('build:clean', function (cb) {
	del([
		'build/**'
	], cb);
});

// task to create build directory of all files
gulp.task('build', ['build:clean'], function(){
    gulp.src('app/**/*/')
    .pipe(gulp.dest('build/'));
});

// task to removed unwanted build files
// list all files and directories here that you don't want included
gulp.task('build:remove', function (cb) {
	del([
		'build/scss/', 
		'build/js/!(*.min.js)'
	], cb);
});




// ////////////////////////////////////////////////
// Browser-Sync Tasks
// // /////////////////////////////////////////////

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./app/"
        }
    });
});


// ////////////////////////////////////////////////
// Watch Tasks
// // /////////////////////////////////////////////

gulp.task ('watch', function(){
	gulp.watch('app/js/*.js', ['scripts']);
	gulp.watch('app/scss/*.scss', ['compass']);
  	gulp.watch('app/**/*.html', ['html']);
});


gulp.task('default', ['scripts', 'compass', 'html', 'browser-sync', 'watch']);

