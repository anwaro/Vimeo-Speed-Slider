var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('scripts', function() {
    return gulp.src('./src/*.js')
        .pipe(concat('index.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('default', function () {
    gulp.watch("src/*.js", ['scripts']);
});
