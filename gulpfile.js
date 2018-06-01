// Requirements
var browserSync = require('browser-sync');
		gulp        = require('gulp');
		imagemin    = require("gulp-imagemin");
		include     = require("gulp-include");
		plumber     = require('gulp-plumber');
		pngquant    = require('imagemin-pngquant');
		pug         = require('gulp-pug');
		rename      = require("gulp-rename");
		sass        = require('gulp-sass');
		uglify      = require('gulp-uglify');


// BrowserSync
gulp.task('browser-sync', function() {
  browserSync.init(['css/*.css', 'js/**/*.js', '*.html'], {
    server: {
      baseDir: 'build'
    }
  });
});
/*
 * Use for proxy projects
 * 
gulp.task('browser-sync', function() {
	browserSync.init({
		proxy: "wpromote.local"
	});
});
 */

// Pug
gulp.task('pug', function buildHTML() {
  return gulp.src('source/pug/*.pug')
  .pipe(plumber())
  .pipe(pug({
    // Your options in here.
    pretty: "  ",
  }))
  .pipe(gulp.dest('build'))
  .pipe(browserSync.stream());
});

// SASS
gulp.task('sass', function() {
  gulp.src('source/sass/**/*.scss')
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'compact'
    }))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
});

// JavaScript
gulp.task('scripts', function() {
  gulp.src('source/js/*.js')
    .pipe(plumber())
    .pipe(include())
    .pipe(uglify())
    .pipe(rename({
      //dirname: "min",
      suffix: ".min",
    }))
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.stream());
});

// Images
gulp.task('images', function() {
  // return gulp.src('build/img/*')
  //   .pipe(imagemin({
  //     progressive: true,
  //     svgoPlugins: [{
  //       removeViewBox: false
  //     }],
  //     use: [pngquant()]
  //   }))
  //   .pipe(gulp.dest('build/img'))
  //   .pipe(browserSync.stream());
});

// Default
gulp.task('default', ['sass', 'browser-sync', 'scripts', 'images', 'pug'], function() {
	gulp.watch('source/pug/**/*.pug', ['pug']);
  gulp.watch('source/sass/**/*.scss', ['sass']);
  gulp.watch('source/js/**/*.js', ['scripts']);
  // gulp.watch('build/img/*', ['images']);
});