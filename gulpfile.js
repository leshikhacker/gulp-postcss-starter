var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var mqpacker = require('css-mqpacker');
var postcssImport  = require("postcss-import");


gulp.task('serve', ['css'], function() {

  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch("./css/postcss/*.css", ['css']);
  gulp.watch("./css/postcss/**/*.css", ['css']);
  gulp.watch("./js/*.js").on('change', browserSync.reload);
  gulp.watch("./*.html").on('change', browserSync.reload);
});


gulp.task('css', function () {
  return gulp.src('./css/postcss/main.css')
    .pipe(postcss([
      postcssImport(),
      precss,
      autoprefixer({browsers: ['last 1 version']}),
      mqpacker
    ]))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);