const gulp = require('gulp');
const rimraf = require('rimraf');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const tsProject = ts.createProject('./tsconfig.json');
const runSequence = require('run-sequence');

/**
 * Define gulp tasks.
 */
gulp.task('clean', (cb) => {
  rimraf('./build', cb);
});

gulp.task('server:build', () => {
  return gulp.src(['src/**/*.ts'])
      .pipe(sourcemaps.init())
      .pipe(tsProject())
      .pipe(sourcemaps.write('.', { includeContent: false }))
      .pipe(gulp.dest('./build/'));
});

gulp.task('default', () => {
    runSequence(
      'clean',
      'server:build'
    );
});
