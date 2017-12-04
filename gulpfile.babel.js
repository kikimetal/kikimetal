import fs from "fs"

// entry point js file name
const indexJs = "index.js"
// bundle js file name
const bundleIndexJs = "bundle.js"
const bundleIndexMinJs = "bundle.js"
// bundle css file name
const bundleCSS = "bundle.css"

import gulp from "gulp"
import sass from "gulp-sass"
import concat from "gulp-concat"
import browserify from "browserify"
import babelify from "babelify"
import source from "vinyl-source-stream"
import buffer from "vinyl-buffer"
import uglify from "gulp-uglify"
import del from "del"
import cleanCSS from "gulp-clean-css"
import autoprefixer from "gulp-autoprefixer"

gulp.task("css:clean", () => {
  return del(["./assets/css/*"])
})

const sassSrc = [
  "./src/css/common/*.css",
  "./src/css/common/*.scss",
  "./src/css/components/*.scss",
]

gulp.task("css", ["css:clean",], () => {
  return gulp.src(sassSrc)
    .pipe(sass({
      outputStyle: "expanded",
    }))
    .pipe(concat("bundle.css"))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest("./assets/css/"))
  }
)
gulp.task("css:min", ["css:clean",], () => {
  return gulp.src(sassSrc)
    .pipe(sass())
    .pipe(concat("bundle.css"))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    // minify
    .pipe(cleanCSS({debug: true}, function(details) {
      console.log(details.name + '(originalSize): ' + details.stats.originalSize)
      console.log(details.name + '(minifiedSize): ' + details.stats.minifiedSize)
    }))
    .pipe(gulp.dest("./assets/css/"))
  }
)

gulp.task("js:clean", () => {
  return del(["./assets/js/*"])
})

const browserifyEntryPoint = ["./src/js/index.js"]

gulp.task("js", ["js:clean"], () => {
  // make fake file
  fs.writeFile("./assets/js/bundle.min.js", "/* this is dammy file for load resource error. */", () => console.log("(gulp) create dammy file '/assets/js/bundle.min.js'"))
  console.log("(gulp) ---browserify-env-development---")

  return browserify({
    extensions: [".jsx"],
    entries: browserifyEntryPoint,
    debug: true,
  })
  .transform(babelify, {
    presets: ["es2015", "react"],
  })
  .bundle()
  .on("error", function (err) { console.log("Error : " + err.message) })
  .pipe(source("bundle.js"))
  .pipe(gulp.dest("./assets/js/"))
})

gulp.task("js:min", ["js:clean"], () => {
  process.env.NODE_ENV = "production";
  // make fake file
  fs.writeFile("./assets/js/bundle.js", "/* this is dammy file for load resource error. */", () => console.log("(gulp) create dammy file '/assets/js/bundle.js'"))
  console.log("(gulp) ---browserify-env-production---")

  return browserify({
    extensions: [".jsx"],
    entries: browserifyEntryPoint,
  })
  .transform(babelify, {
    presets: ["es2015", "react"],
  })
  .bundle()
  .pipe(source("bundle.min.js"))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest("./assets/js/"))
})

gulp.task("dist:clean", () => {
  return del(["./__dist/*"])
})
gulp.task("dist", ["dist:clean", "js:min", "css:min"], () => {
  gulp.src("./index.php")
    .pipe(gulp.dest("./__dist/"))
  gulp.src("./assets/**/*")
    .pipe(gulp.dest("./__dist/assets/"))
})

gulp.task("d", ["dist"])

gulp.task("build", ["js", "css"])

gulp.task("default", ["build"])
