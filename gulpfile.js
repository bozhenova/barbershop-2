var gulp = require('gulp'),
  sass = require('gulp-sass'),
  plumber = require('gulp-plumber'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  minify = require('gulp-csso'),
  image = require('gulp-image'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

gulp.task('sass', function() {
  return gulp
    .src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(
      sass({
        includePaths: require('node-normalize-scss').includePaths,
        outputStyle: 'expanded',
      })
    )
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('./dist'))
    .pipe(minify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
  return gulp
    .src('source/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
});

gulp.task('html', function() {
  return gulp
    .src('source/*.html')
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
});

gulp.task('image', function() {
  return gulp
    .src('source/img/*')
    .pipe(image())
    .pipe(gulp.dest('./dist/img'))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['sass', 'js', 'html', 'image'], function() {
  browserSync.init({
    server: {
      baseDir: './dist',
    },
  });

  gulp.watch('source/sass/*.scss', ['sass']).on('change', browserSync.reload);
  gulp.watch('source/img/*', ['image']).on('change', browserSync.reload);
  gulp.watch('source/js/*.js', ['js']).on('change', browserSync.reload);
  gulp.watch('source/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
