const {src, dest, watch, parallel} = require("gulp");

// CSS
const plumber = require("gulp-plumber");
const sass = require("gulp-sass")(require("sass"));

// Image
const imagemin = require("gulp-imagemin");
const cache = require("gulp-cache");
const webp = require("gulp-webp");

function css(done) {
    src("src/scss/**/*.scss") // Identity files
        .pipe( plumber())
        .pipe( sass()) // Compilate
        .pipe( dest("build/css")) // Store to disk

    done();
}

function imagenes (done) {
    src("images/**/*.png")
        .pipe( cache( imagemin( {optimizationLevel:3} ) ) )
        .pipe( dest("build/img"))

    done();
}

function Vwebp (done) {
    const opciones = {
        quality: 50
    }

    src("images/**/*.png")
        .pipe (webp(opciones) )
        .pipe (dest ("build/img"))
    
    done();
}

function dev(done) {
    watch("src/scss/**/*.scss", css);

    done();
}

exports.css = css;
exports.imagenes = imagenes;
exports.Vwebp = Vwebp;
exports.dev = parallel(dev, imagenes, Vwebp);