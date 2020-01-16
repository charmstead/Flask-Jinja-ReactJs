const gulp = require('gulp');
const del = require('del');
const size = require('gulp-size');
const babelify = require('babelify')
const browserifyCss = require('browserify-css')
const browserify = require('browserify');
const uglify = require('gulp-uglify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');



gulp.task('react', function () {
    const stream = browserify({ entries: './ReactSrc/index.js'})
    .transform(babelify.configure({
        presets : [ "@babel/preset-env", "@babel/preset-react"]
    }))
    .transform(browserifyCss,{global: false})
        // .transform([babelify, { presets: ["@babel/preset-env", "@babel/preset-react"] },[browserifyCss]])
        .bundle()
        .pipe(source('index.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./static/react/'))
        .pipe(size());
    return stream;
});

gulp.task('del', function () {
    return del(['./static/react']);
});


gulp.task('default', gulp.series('del', 'react', function () {
    gulp.watch('./ReactSrc/*.js', gulp.series('react'));
}));