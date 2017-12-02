// deployment dir name
const deploymentDir = "__build"
// index file
const indexHtml = "index.php"
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

gulp.task("sass-compile-components", ()=>{
    return gulp.src([
      "./css/src/components/*.sass",
      "./css/src/components/*.scss",
    ])
        .pipe(sass({
            outputStyle: "expanded",
        }))
        .pipe(concat("bundle-components.css"))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest("./css/src/"))
})

gulp.task("sass-compile-common", () => {
    return gulp.src([
        "./css/src/common/myreset.css",
        "./css/src/common/common.sass",
        "./css/src/common/*.sass",
        "./css/src/common/*.scss",
    ])
        .pipe(sass({
            outputStyle: "expanded",
        }))
        .pipe(concat("bundle-common.css"))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest("./css/src/"))
})

gulp.task("css",
    [
        "sass-compile-common",
        "sass-compile-components",
    ],
    () => {
        return gulp.src([
            "./css/src/bundle-common.css",
            "./css/src/bundle-components.css",
        ])
        .pipe(concat(bundleCSS))
        .pipe(gulp.dest("./css/"))
    }
)

gulp.task("css-min",
    [
        "sass-compile-common",
        "sass-compile-components",
    ],
    () => {
        return gulp.src([
            "./css/src/bundle-common.css",
            "./css/src/bundle-components.css",
        ])
        .pipe(concat(bundleCSS))
        .pipe(cleanCSS({debug: true}, function(details) {
            console.log(details.name + '(originalSize): ' + details.stats.originalSize)
            console.log(details.name + '(minifiedSize): ' + details.stats.minifiedSize)
        }))
        .pipe(gulp.dest("./css/"))
    }
)

gulp.task("browserify", ()=>{
    return browserify({
        extensions: [".jsx"],
        entries: [`./js/src/${indexJs}`],
        debug: true,
    })
        .transform(babelify, {
            presets: ["es2015", "react"],
        })
        .bundle()
        .on("error", function (err) { console.log("Error : " + err.message) })
        .pipe(source(bundleIndexJs)) // 出力ファイル名を指定
        .pipe(gulp.dest("./js/"))
})

gulp.task("browserify-min", ()=>{
    return browserify({
        extensions: [".jsx"],
        entries: [`./js/src/${indexJs}`],
    })
        .transform(babelify, {
            presets: ["es2015", "react"],
        })
        .bundle()
        .pipe(source(bundleIndexMinJs)) // 出力ファイル名を指定
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest("./js/"))
})

gulp.task("apply-prod-environment", ()=>{
    return process.env.NODE_ENV = "production"
})

gulp.task("clean", (callback)=>{
    return del([
        `./${deploymentDir}/**/*`,
    ], callback)
})

gulp.task("build", // deployment index
    [
        "clean",
        "apply-prod-environment",
        "css-min",
        "browserify-min",
    ], ()=>{
        gulp.src(`./routes.json`)
            .pipe(gulp.dest(`./${deploymentDir}/`))
        gulp.src(`./${indexHtml}`)
            .pipe(gulp.dest(`./${deploymentDir}/`))
        gulp.src(`./image/**/*`)
            .pipe(gulp.dest(`./${deploymentDir}/image/`))
        gulp.src(`./js/${bundleIndexMinJs}`)
            .pipe(gulp.dest(`./${deploymentDir}/js/`))
        gulp.src(`./css/${bundleCSS}`)
            .pipe(gulp.dest(`./${deploymentDir}/css/`))
    }
)

gulp.task("watch", ["default"], ()=>{
    gulp.watch("./css/**/*", [
        "css",
    ])
    gulp.watch("./js/src/**/*.js", [
        "browserify",
    ])
})

gulp.task("default", [
    "css",
    "browserify",
])
