'use strict';

const gulp = require('gulp-help')(require('gulp'));
const tslint = require('gulp-tslint');
const mocha = require('gulp-mocha');
const del = require('del');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const merge = require('merge2');
const sh = require('shelljs');

require('dotbin');

const config = ts.createProject('./tsconfig.json', {
    module: 'umd',
    declaration: true
});

const testsConfig = ts.createProject('./tsconfig.json', {
    module: 'require'
});

const files = ['typings/main.d.ts', 'src/**/*.ts'];
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

const build = (files, config) => gulp.src(files).pipe(ts(config));
const _merge = (result, dest) => merge([result.dts.pipe(gulp.dest(dest)), result.js.pipe(gulp.dest(dest))]);

gulp.task('build-ts', () => {
    const result = build(files, config);
    return _merge(result, './build');
});

gulp.task('build', ['build-ts'], () => 
    sh.exec('node build/server.js')
);

gulp.task('build-tests', () =>
    build(testsFiles, testsConfig)
        .pipe(gulp.dest('./test'))
);

gulp.task('test', 'Runs the Jasmine test specs', () =>
    gulp.src('test/**/*.js')
        .pipe(mocha())
);

gulp.task('watch', 'Watches ts source files and runs build on change', () => {
    gulp.watch('src/**/*.ts', ['build']);
    gulp.watch('test/**/*.ts', ['build-tests']);
});
