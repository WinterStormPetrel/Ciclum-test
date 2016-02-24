var gulp = require('gulp'),
    sass = require('gulp-sass'),
    gls = require('gulp-live-server'),
    jshint = require('gulp-jshint'),
    dist = 'src/',
    isProd = true;

// Error logger
function errorLog(error) {
    console.error.bind(error);
    this.emit('end');
}

// Code quality
gulp.task('vet', function () {
    return gulp.src(['src/js/**/!(libs)**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe(jshint.reporter('fail'));
});

// Copy to src
gulp.task('copy', function () {
    return gulp.src([
      'node_modules/knockout/build/output/knockout-latest.js',
      'node_modules/requirejs/require.js,',
      'node_modules/socket.io-client/socket.io.js'
    ])
        .pipe(gulp.dest('src/js/libs'));
});

gulp.task('sass', function () {
  var conf = isProd ? {outputStyle: 'compressed'}:{sourceComments: 'map'};
    return gulp.src('src/scss/main.scss')
        .pipe(sass(conf))
        .on('error', errorLog)
        .pipe(gulp.dest( dist +'css'));
});

gulp.task('watch', function () {
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/templates/**/*.jade', ['jade']);
});

gulp.task('serve', function () {
    var server = gls.static('src', 8888);
    server.start();
    gulp.watch([
      'src/**/*.css',
      'src/**/*.js',
      'src/**/*.html'
    ], function (file) {
        server.notify.apply(server, [file]);
    });
});

gulp.task('default', ['sass', 'watch', 'serve']);