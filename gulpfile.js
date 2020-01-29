// utilities
const gulp = require('gulp');
const rename = require('gulp-rename')

// html
const htmlmin = require('gulp-htmlmin');

// css
const sass = require('gulp-sass');
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

// javascript
const uglify = require('gulp-uglify-es').default;

// images
const imagemin = require('gulp-imagemin');

const html = () =>
    gulp.src('src/index.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist'));

const css = () => {
    const plugins = [autoprefixer()]
    return gulp.src('src/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));
}

const img = () =>
    gulp.src('src/img/**')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));

const js = () =>
    gulp.src('src/index.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'));

const watch = () => {
    gulp.watch('src/**/*.html', html);
    gulp.watch('src/**/*.scss', css);
    gulp.watch('src/index.js', js);
};

module.exports = {
    default: gulp.parallel(html, css, img, js),
    html,
    css,
    watch,
};