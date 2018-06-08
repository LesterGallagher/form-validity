var closureCompiler = require('google-closure-compiler').gulp();
var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.task('min', () => {
    return gulp.src('./src/**/*.js', { base: './' })
        .pipe(closureCompiler({
            compilation_level: 'ADVANCED',
            warning_level: 'VERBOSE',
            language_in: 'ECMASCRIPT6_STRICT',
            language_out: 'ECMASCRIPT3',
            output_wrapper: '(function(){\n%output%\n}).call(this)',
            js_output_file: 'form-validity.min.js'
        }))
        .on('error', gutil.log)
        .pipe(gulp.dest('./'));
});

gulp.task('normal', () => {
    return gulp.src('./src/**/*.js', { base: './' })
        .pipe(closureCompiler({
            compilation_level: 'SIMPLE',
            language_in: 'ECMASCRIPT6_STRICT',
            language_out: 'ECMASCRIPT3',
            output_wrapper: '(function(){\n%output%\n}).call(this)',
            js_output_file: 'form-validity.js'
        }))
        .on('error', gutil.log)
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['min', 'normal'], () => {});

gulp.task('watch', () => {
    return gulp.watch('./src/*.js', ['default']);
});