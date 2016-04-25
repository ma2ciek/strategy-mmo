'use strict';

const gulp = require('gulp-help')(require('gulp'));
const tslint = require('gulp-tslint');
const mocha = require('gulp-mocha');
const gulpSequence = require('gulp-sequence');
const del = require('del');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const merge = require('merge2');

require('dotbin');

const serverConfig = ts.createProject('./tsconfig.json', {
    declaration: true
});

const clientConfig = ts.createProject('./tsconfig.json', {
    module: 'umd',
    declaration: true
});

const testsConfig = ts.createProject('./tsconfig.json', {
    module: 'require'
});

const serverFiles = ['typings/main.d.ts', 'src/**/*.ts'];
const clientFiles = ['typings/browser.d.ts', 'public/**/*.ts'];
const testsFiles = ['typings/browser.d.ts', 'test/**/*.ts'];
const appName = require('./package.json').name;

gulp.task('clean', 'Cleans the generated js files from build directory', function () {
    return del(['build/**/**']);
});

gulp.task('lintServer', 'Lints all TypeScript source files', () =>
    gulp.src(serverFiles)
        .pipe(tslint())
        .pipe(tslint.report('verbose'))
);

gulp.task('build-server', ['lintServer'], () => {
    const result = gulp.src(serverFiles)
        .pipe(ts(serverConfig))

    return merge([
        result.dts.pipe(gulp.dest('./build')),
        result.js.pipe(gulp.dest('./build'))
    ])
});

gulp.task('build-client', () => {
    const result = gulp.src(clientFiles)
        .pipe(ts(clientConfig))

    return merge([
        result.dts.pipe(gulp.dest('./public')),
        result.js.pipe(gulp.dest('./public'))
    ])
});

gulp.task('build-tests', () =>
    gulp.src(testsFiles)
        .pipe(ts(testsConfig))
        .pipe(gulp.dest('./test'))
);

gulp.task('build', ['build-server', 'build-client', 'build-tests']);

gulp.task('test', 'Runs the Jasmine test specs', () =>
    gulp.src('test/**/*.js')
        .pipe(mocha())
);

gulp.task('watch', 'Watches ts source files and runs build on change', () => {
    gulp.watch('src/**/*.ts', ['build-server']);
    gulp.watch('public/**/*.ts', ['build-client']);
    gulp.watch('test/**/*.ts', ['build-tests']);
});
