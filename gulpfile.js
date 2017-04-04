const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const browserify = require('browserify');
const tap = require('gulp-tap');
const buffer = require('gulp-buffer');
const sourcemaps = require('gulp-sourcemaps');
const esmangle = require('gulp-esmangle');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');
const imagemin = require('gulp-imagemin');
const postcss = require('gulp-postcss');
const cssnext = require('postcss-cssnext');

gulp.task('build:css', () => {
  gulp.src('src/css/*.css')
    .pipe(postcss([cssnext()]))
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

gulp.task('build:images', () => {
  gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('public/images'));
});

gulp.task('nodemon', done => {
  let started = false;
  nodemon({
    script: 'app.js',
    ignore: [
      'public',
      'src'
    ]
  })
    .on('start', () => {
      if (!started) {
        done();
        started = true;
      }
    });
});

gulp.task('browser-sync', ['nodemon'], () => {
  browserSync.init(null, {
    proxy: 'http://localhost:3000',
    files: ['public/**/*.*'],
    browser: 'google chrome',
    port: 5000
  });
});

gulp.task('build', ['build:js', 'build:css']);

gulp.task('watch', ['browser-sync'], () => {
  gulp.watch('src/css/**/*.css', ['build:css']);
  gulp.watch('src/images/*', ['build:images']);
  gulp.watch('src/js/**/*.js', ['build:js']);
});
