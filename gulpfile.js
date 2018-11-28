const gulp = require('gulp');
const order = require('gulp-order');
const concat = require('gulp-concat');
const replace = require('gulp-replace');
const sourcemaps = require('gulp-sourcemaps');
const browsersync = require('browser-sync');

// PostCSS 
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer');
const customProperties = require('postcss-custom-properties');
const pxtorem = require('postcss-pxtorem');
const cssnano = require('cssnano');

// Webpack
const webpack = require('webpack-stream');

gulp.task('html', function() {
  return gulp
    .src('./src/pages/*.html')
    .pipe(gulp.dest('./build/'))
    .pipe(browsersync.reload({ stream: true }));
});
gulp.task('css', function() {
  const plugins = [
    customProperties(),
    pxtorem(),
    autoprefixer(),
  ];
  return gulp
    .src('./src/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(order([
      "/src/css/_common.css",
      "/src/css/_swiper.css",
      "/src/css/*.css"
    ]))
    .pipe(concat('styles.css'))
    .pipe(postcss(plugins))
    .pipe(replace('url(/','url(../'))
    .pipe(replace('url(\'/','url(\'../'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build/css'))
    .pipe(browsersync.reload({ stream: true }));
});
gulp.task("js", function() {
  return gulp
    .src("src/js/entry.js")
    .pipe(
      webpack({
        config: require("./webpack.config.js"),
      })
    )
    .pipe(gulp.dest("build/js/"))
    .pipe(browsersync.reload({ stream: true }))
})
gulp.task('images', function() {
  return gulp
    .src("src/images/**/*")
    .pipe(gulp.dest("./build/images/"))
    .pipe(browsersync.reload({ stream: true }))
});
gulp.task('svg', function() {
  return gulp
    .src("src/svg/**/*")
    .pipe(gulp.dest("./build/svg/"))
    .pipe(browsersync.reload({ stream: true }))
});
gulp.task('fonts', function() {
  return gulp
    .src("src/fonts/*")
    .pipe(gulp.dest("./build/fonts/"))
    .pipe(browsersync.reload({ stream: true }))
});
gulp.task("browser-sync", function() {
  browsersync({
    server: {
      baseDir: "./build/",
    },
  });
});
gulp.task(
  "default",
  ["html", "js", "css", "images", "svg", "fonts", "browser-sync"],
  function() {
    gulp.watch("src/pages/*.html", ["html"]);
    gulp.watch("src/**/*.css", ["css"]);
    gulp.watch("src/js/**/*.js", ["js"]);
    gulp.watch("src/images/**/*", ["images"]);
    gulp.watch("src/svg/**/*", ["images"]);
    gulp.watch("src/svg/**/*", ["svg"]);
    gulp.watch("src/fonts/**/*", ["fonts"]);
  }
);
