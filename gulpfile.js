var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    notify = require("gulp-notify"),
    bower = require('gulp-bower');

var config = {
    sassPath: './lib/src/sass',
    bowerDir: './bower_components'
}

gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(config.bowerDir))
});

gulp.task('icons', function() {
    return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*')
        .pipe(gulp.dest('./lib/dest/fonts'));
});

gulp.task('bootstrap-fonts', function() {
    return  gulp.src(config.bowerDir + '/bootstrap-sass-official/assets/fonts/bootstrap/**.*')
        .pipe(gulp.dest('./lib/dest/fonts/bootstrap'));
});

gulp.task('js', function() {
    return gulp.src(config.bowerDir + '/bootstrap-sass-official/assets/javascripts/bootstrap.min.js')
        .pipe(gulp.dest('./lib/dest/js'));
});

gulp.task('css', function() {
    sass('./lib/src/sass/**/*.scss', {
        style: 'compressed',
        loadPath: [
            config.bowerDir + '/bootstrap-sass-official/assets/stylesheets',
            config.bowerDir + '/fontawesome/scss'
        ]
    })
    .on('error', sass.logError)
    .pipe(gulp.dest('./lib/dest/css'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(config.sassPath + '/**/*.scss', ['css']);
    gulp.watch(config.bowerDir + '/bootstrap-sass-official/assets/stylesheets/**/*.scss', ['css']);
});

gulp.task('default', ['bower', 'icons', 'bootstrap-fonts', 'js', 'css', 'watch']);