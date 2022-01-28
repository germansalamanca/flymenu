const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

//complie scss
function style(){
    // Where is my scss
    return gulp.src('./sass/**/*.scss')
    //Pass that file through de sass compiler
    .pipe(sass().on('error', sass.logError)) //Mostrar log error desass en lugar de gulp
    //.pipe(sass()) No mostrar esrrores de sass
    // Where do I save the compiled class
    .pipe(gulp.dest('./css'))
    // Stream changes to all browsers
    .pipe(browserSync.stream());
}

function watch(){
    browserSync.init({
        server: {
            baseDir: '.'
        }
    });
    gulp.watch('./sass/**/*.scss', style);
    gulp.watch('*.html').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}
exports.style = style;
exports.watch = watch;
