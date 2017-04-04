const gulp = require('gulp');
const cssnext = require('gulp-cssnext');
const cssnano = require('gulp-cssnano');
const browserify = require('browserify');
const tap = require('gulp-tap');
const buffer = require('gulp-buffer');
const sourcemaps = require('gulp-sourcemaps');
const esmangle = require('gulp-esmangle');

gulp.task('build:css', () => {
  gulp.src('src/css/*.css')
    .pipe(cssnext())
    .pipe(cssnano())
    .pipe(gulp.dest('public'));
});

gulp.task('build:js', () => {
  gulp.src('src/js/*.js', {read: false})
    .pipe(tap(file => {
      file.contents = browserify(file.path)
        .transform('babelify', {presets: ['es2015']})
        .bundle();
    }))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(esmangle())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public'));
});

gulp.task('build', ['build:js', 'build:css']);
