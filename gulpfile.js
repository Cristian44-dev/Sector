const gulp = require("gulp");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const htmlmin = require("gulp-htmlmin");
const webp = require("gulp-webp");
const imagemin = require("gulp-imagemin");
const sourcemaps = require("gulp-sourcemaps");
const terser = require("gulp-terser");
//postcss
const postImport = require("postcss-import");
const postNesting = require("postcss-nested");

function gulp_css() {
    const procesadores = [
        postImport({
            root: "./src/**/*.css",
        }),
        postNesting(),
        cssnano(),
    ];
    return gulp
        .src("./src/*.css")
        .pipe(sourcemaps.init())
        .pipe(postcss(procesadores))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("./build"));
}

function gulp_html() {
    return gulp
        .src("./src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("./"));
}

function gulp_webp(){
    return gulp
    .src("./src/assets/*.png")
    .pipe(webp())
    .pipe(gulp.dest("./build/assets"))
}

function gulp_imagemin(){
    return gulp
    .src("./src/assets/*")
    .pipe(imagemin())
    .pipe(gulp.dest("./build/assets/"))
}


function gulp_js(){
    return gulp
    .src("./src/*.js")
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./build/"))
}

function watch() {
    gulp.watch("./src/*.html", gulp_html);
    gulp.watch("./src/**/*.css", gulp_css);
    gulp.watch("./src/*.js", gulp_js);
}

exports.css = gulp_css;
exports.html = gulp_html;
exports.watch = watch;
exports.webp = gulp_webp;
exports.imagemin = gulp_imagemin;
exports.js = gulp_js;