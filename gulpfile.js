// Dependencies
var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    less = require('gulp-less'),
    path = require('path'),
    browserSync = require('browser-sync');

// Concat/Minify JS Files
gulp.task('scripts', function() {
    gulp.src(['src/js/jquery.1.11.1.min.js', 'src/js/bootstrap.min.js', 'src/js/main.js'])
        .pipe(plumber())
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Compile LESS Files
gulp.task('less', function () {
   gulp.src('src/less/*.less')
    .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(less({
          compress: true
        }))
        .pipe(rename("css/main.min.css"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist"));

});

// Static server
gulp.task('browser-sync', function(){
    browserSync.init(["dist/css/*.css", "dist/js/*.js"], {
        server: {
            // host: "192.168.1.1",
            baseDir: "./"
        },
        notify: false,
    })
});

// Reload all Browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});


// Default Task
// Watch scss AND html files, doing different things with each.
gulp.task('default', ['scripts', 'less', 'browser-sync'], function () {
    gulp.watch('src/js/**', ['scripts'])
    gulp.watch("src/less/**", ['less']);
    gulp.watch("*.html", ['bs-reload']);
    gulp.watch("*.json", ['bs-reload']);
});
