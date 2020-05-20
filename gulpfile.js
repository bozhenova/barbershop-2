var gulp = require('gulp'),
  sass = require('gulp-sass'),
  plumber = require('gulp-plumber'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  minify = require('gulp-csso'),
  rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

gulp.task('scss', function(done) {
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
    .pipe(gulp.dest('source/css'))
    .pipe(minify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('source/css'))
    .pipe(browserSync.stream());

  done();
});

gulp.task('html', function() {
  return gulp.src('source/*.html').pipe(browserSync.stream());
});

gulp.task('js', function() {
  return gulp.src('source/js/*.js').pipe(browserSync.stream());
});

gulp.task('watch', function(done) {
  browserSync.init({
    server: './source',
  });

  gulp.watch('source/sass/**/*.scss', gulp.series('scss'));
  gulp.watch('source/*.html').on('change', () => {
    browserSync.reload();
    done();
  });

  done();
});

gulp.task('default', gulp.series('scss', 'watch'));
