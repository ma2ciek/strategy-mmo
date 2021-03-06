'use strict';

const gulp = require('gulp-help')(require('gulp'));
const tslint = require('gulp-tslint');
const mocha = require('gulp-mocha');
const del = require('del');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const merge = require('merge2');

require('dotbin');

const config = ts.createProject('./tsconfig.json', {
    module: 'umd',
    declaration: true
});

const files = ['typings/main.d.ts', 'src/**/*.ts'];
const appName = require('./package.json').name;

gulp.task('clean', 'Cleans the generated js files from build directory', function () {
    return del(['build/**/**']);
});

gulp.task('lint', () =>
    gulp.src(files)
        .pipe(tslint())
        .pipe(tslint.report('verbose'))
);

const build = (files, config) => gulp.src(files).pipe(ts(config));
const _merge = (result, dest) => merge([result.dts.pipe(gulp.dest(dest)), result.js.pipe(gulp.dest(dest))]);

gulp.task('watch', 'Watches ts source files and runs build on change', () => {
    gulp.watch('src/**/*.ts', ['test']);
});

gulp.task('test', ['build'], () =>
    gulp.src('build/**/*-spec.js')
        .pipe(mocha({ reporter: 'nyan' }))
);

gulp.task('run', ['build'], () =>
    sh.exec('node build/server.js')
);

gulp.task('build', () => {
    const result = build(files, config);
    return _merge(result, './build');
});

gulp.task('lib', () => merge(
    gulp.src([
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/es6-shim/es6-shim.min.js',
        'node_modules/systemjs/dist/system.js'
    ]).pipe(gulp.dest('build/lib')),

    gulp.src(['node_modules/@angular/**/*'])
        .pipe(gulp.dest('build/lib/@angular')),

    gulp.src(['node_modules/rxjs/**/*'])
        .pipe(gulp.dest('build/lib/rxjs'))
));