const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
const sass = require("gulp-sass");
const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify-es").default;

const html = () =>
    gulp.src("src/index.html")
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest("dist"));

const css = () =>
    gulp.src("src/index.scss")
        .pipe(sass({
            includePaths: ["node_modules"],
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest("dist"));

const img = () =>
    gulp.src("src/img/**")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img"));

const js = () =>
    gulp.src("src/index.js")
        .pipe(uglify())
        .pipe(gulp.dest("dist"));

const watch = () => {
    gulp.watch("src/**/*.html", html);
    gulp.watch("src/**/*.scss", css);
    gulp.watch("src/index.js", js);
};

module.exports = {
    default: gulp.parallel(html, css, img, js),
    html,
    css,
    watch,
};