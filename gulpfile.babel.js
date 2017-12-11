import path from "path"
import gulp from "gulp"
import plumber from "gulp-plumber"
import del from "del"

// practical commands ----------------------------
// php server
gulp.task("start", ["server"])
// build js & css
gulp.task("default", ["build"])
gulp.task("build", ["js", "css"])
// watch
gulp.task("watch", ["js", "css"], () => {
  gulp.watch("./src/js/**/*", ["js"])
  gulp.watch("./src/css/**/*", ["css"])
})
// use webpack env:production & css minify
gulp.task("dist", ["js:prod", "css:min"])
// -----------------------------------------------

// js build use webpack in gulp
import webpackStream from "webpack-stream"
import webpack from "webpack"
import webpackConfigDev from "./webpack.dev.babel.js"
import webpackConfigProd from "./webpack.prod.babel.js"

const jsOutputPath = path.resolve(__dirname, "public", "assets", "js")

gulp.task("js:clean", () => {
  return del([jsOutputPath])
})

gulp.task("js", ["js:clean"], () => {
  console.log("(gulp) start webpack env:dev")
  return webpackStream(webpackConfigDev, webpack)
    .pipe(gulp.dest(jsOutputPath))
})

gulp.task("js:prod", ["js:clean"], () => {
  console.log("(gulp) start webpack env:production")
  return webpackStream(webpackConfigProd, webpack)
    .pipe(gulp.dest(jsOutputPath))
})


// scss bundle
// sourcemaps 参考(https://qiita.com/takuyabe/items/e9f253f672d1df058cd0)
import sass from "gulp-sass"
import concat from "gulp-concat"
import cleancss from "gulp-clean-css"
import autoprefixer from "gulp-autoprefixer"
import sourcemaps from "gulp-sourcemaps"

const scssPath = [
  "./src/css/common/*.scss",
  "./src/css/**/*.scss",
]
const cssOutputPath = path.resolve(__dirname, "public", "assets", "css")

gulp.task("css:clean", () => {
  return del([cssOutputPath])
})

gulp.task("css", ["css:clean"], () =>
    gulp.src(scssPath)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: "expanded",
    }).on("error", sass.logError))
    .pipe(concat("bundle.css"))
    .pipe(sourcemaps.write({includeContent: false}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(autoprefixer({
      browsers: ["last 2 versions"]
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(cssOutputPath))
)

gulp.task("css:min", ["css:clean"], () =>
    gulp.src(scssPath)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(concat("bundle.css"))
    .pipe(cleancss({debug: true}, (details) => {
      console.log("(gulp) css minify state " + details.name + "[original]: " + details.stats.originalSize)
      console.log("(gulp) css minify state " + details.name + "[minified]: " + details.stats.minifiedSize)
    }))
    .pipe(sourcemaps.write({includeContent: false}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(autoprefixer({
      browsers: ["last 2 versions"],
      cascade: false,
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(cssOutputPath))
)


// run php built-in server && browser hot-reload
// use "gulp server"
import browserSync from "browser-sync"
import php from "gulp-connect-php"

gulp.task("server", ["browser-sync"], () => {
  gulp.watch("./public/**/*", ["browser-reload"])
})

gulp.task("php-built-in-server", () => {
  return php.server({
    base: "public/",
    port: 8000,
  })
})

gulp.task("browser-sync", ["php-built-in-server"], () => {
  return browserSync({
    proxy: "localhost:8000",
    port: 8000,
    open: "external",
  })
})

gulp.task("browser-reload", () => {
  return browserSync.reload();
})
