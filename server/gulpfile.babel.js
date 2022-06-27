/*
 * author: ManhNV11*/

import gulp from 'gulp';
import plumber from 'gulp-plumber';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import removeEmptyLines from 'gulp-remove-empty-lines';
import strip from 'gulp-strip-comments';
import uglify from 'gulp-uglify';
import stripDebug from 'gulp-strip-debug';
import js_obfuscator from 'gulp-js-obfuscator';

import rimraf from 'rimraf';

const runSequence = require('run-sequence').use(gulp);

const path = {
	src: {
		server: {
			src_server: ['server/**/*.js',
				'!server/public/private_loader_dtt_auth/**/*.js'],
			asset_server: [
				'server/**/*.json',
				'server/**/*.html',
				'server/**/*.ico'
			],
			private_share: 'server/public/private_loader_dtt_auth/**/*.js'
		},
		package_manage: [
			'package.json',
			'ecosystem.config.js'
		]
	},
	public: {
		server: {
			src_server: 'dist/server',
			asset_server: 'dist/server',
			private_share: 'dist/server/public/private_loader_dtt_auth'
		},
		package_manage: 'dist'
	}
};

/*check syntax vs eslint*/
gulp.task('lint:server', () => {
	return gulp.src(path.src.server.src_server)
		.pipe(eslint(), {
			configFile: '.eslintrc',
			env: [
				'browser',
				'es6',
				'mocha'
			]
		})
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('server:copy-asset-server', () => {
	"use strict";
	gulp.src(path.src.server.asset_server)
		.pipe(gulp.dest(path.public.server.asset_server));
});

gulp.task('server:save-package', () => {
	"use strict";
	gulp.src(path.src.package_manage)
		.pipe(gulp.dest(path.public.package_manage));
});

gulp.task('remove-build', (cb) => {
	"use strict";
	rimraf('./dist/server', cb);
});

//override share private detector mobile
gulp.task('private-share:build', (cb) => {
	gulp.src(path.src.server.private_share)
		.pipe(plumber())
		.pipe(strip())
		.pipe(stripDebug())
		.pipe(removeEmptyLines({
			removeComments: true
		}))
		.pipe(uglify()) //todo build that moi de lai
		.pipe(js_obfuscator())
		.pipe(gulp.dest(path.public.server.private_share));
});

//install plugin transform-runtime
gulp.task('compile-es6', () => {
	"use strict";
	gulp.src(path.src.server.src_server)
		.pipe(plumber())
		.pipe(babel({
			plugins: ['transform-runtime']
		}))
		.pipe(stripDebug()) //todo uncomment remove console.log
		.pipe(strip())
		.pipe(removeEmptyLines({
			removeComments: true
		}))
		.pipe(gulp.dest(path.public.server.src_server));
});

gulp.task('server:build', (callback) => {
	"use strict";
	runSequence(
		'remove-build',
		['server:copy-asset-server', 'server:save-package'],
		'compile-es6',
		'private-share:build',
		callback
	);
});