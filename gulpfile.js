const gulp = require('gulp');
const cssnext = require('gulp-cssnext');
const cssnano = require('gulp-cssnano');

gulp.task('build:css', () => {
  gulp.src('src/css/*.css')
    .pipe(cssnext())
    .pipe(cssnano())
    .pipe(gulp.dest('public'));
});

gulp.task('build:js', () => {

});

gulp.task('build', ['build:js', 'build:css']);
