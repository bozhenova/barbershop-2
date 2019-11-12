var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  sass = require('gulp-sass'),
  plumber = require('gulp-plumber'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  minify = require('gulp-csso'),
  rename = require('gulp-rename');

gulp.task('scss', function() {
  return gulp
    .src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('source/css'))
    .pipe(minify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('source/css'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('html', function() {
  return gulp.src('source/*.html').pipe(browserSync.reload({ stream: true }));
});

gulp.task('script', function() {
  return gulp.src('source/js/*.js').pipe(browserSync.reload({ stream: true }));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: { baseDir: 'source/' },
  });
});

gulp.task('watch', function() {
  gulp.watch('source/sass/**/*.scss', gulp.parallel('scss'));
  gulp.watch('source/*.html', gulp.parallel('html'));
  gulp.watch('source/js/*.js', gulp.parallel('script'));
});

gulp.task('default', gulp.parallel('browserSync', 'watch'));
