var gulp = require('gulp'),
    less = require('gulp-less'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    cleanCss = require('gulp-clean-css'),
    browserSync = require('browser-sync').create();

// paths object
var paths = {
  less: 'src/less/*.less',
  html: '*.html',
  images: 'src/images/**/*',
  fonts: ['bower_components/bootstrap/dist/fonts/*', 'src/fonts/*'],
  js: ['bower_components/bootstrap/dist/js/bootstrap.js', 'src/js/*.js']
}

// LESS TASK
gulp.task('less', function() {
  return gulp.src('src/less/main.less')
    .pipe(less().on('error', function(err) {
      gutil.log(err);
      this.emit('end');
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(cleanCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

// HTML TASK
gulp.task('html', function() {
  return gulp.src(paths.html)
    .pipe(browserSync.stream());
});

// JS TASK
gulp.task('js', function() {
  return gulp.src(paths.js)
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

// FONTS TASK
gulp.task('fonts', function() {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest('dist/fonts'))
    .pipe(browserSync.stream());
});

// IMAGES TASK
gulp.task('images', function() {
  return gulp.src(paths.images)
    .pipe(gulp.dest('dist/images'))
    .pipe(browserSync.stream());
});

// WATCH TASK
gulp.task('watch', function() {
  gulp.watch(paths.less, ['less']);
  gulp.watch(paths.html, ['html']);
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch(paths.fonts, ['fonts']);
  gulp.watch(paths.images, ['images']);
});

// BROWSER SYNC TASK
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

// clean task
gulp.task('clean', function () {
	return gulp.src('dist', {read: false})
		.pipe(clean());
});

// DEFAULT TASK
gulp.task('default',['less', 'html', 'js', 'images', 'fonts', 'browser-sync', 'watch']);