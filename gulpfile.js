var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var gulpNSP = require('gulp-nsp');

// check project for vulnerable packages
gulp.task('nsp', function (cb) {
  gulpNSP({package: __dirname + '/package.json'}, cb);
});

// run tests
gulp.task('mocha', function() {
    return gulp.src(['tests/**/*.test.js'], { read: false })
        .pipe(mocha({ reporter: 'list' }))
        .on('error', gutil.log);
});

// watch for changing files
gulp.task('default', function() {
      gulp.watch(['controllers/**', 'tests/**'], ['mocha', 'nsp']);
});