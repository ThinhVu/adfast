/**
 * @Created 1/13/2017.
 * @Author: ManhNV
 * @description: bundle file client
 */

let gulp = require('gulp');
let plumber = require('gulp-plumber');
let babel = require('gulp-babel');
let eslint = require('gulp-eslint');
let removeEmptyLines = require('gulp-remove-empty-lines');
let removeHtmlComments = require('gulp-remove-html-comments');
let strip = require('gulp-strip-comments');
let uglify = require('gulp-uglify');
let stripDebug = require('gulp-strip-debug');
let rimraf = require('rimraf');
let html_min = require('gulp-htmlmin');
let header = require('gulp-header');
let ngAnnotate = require('gulp-ng-annotate');
let gulpUtil = require('gulp-util');
let pump = require('pump');
let minifyCSS = require('gulp-clean-css');
let autoprefixer = require('gulp-autoprefixer');

const imagemin = require('gulp-imagemin'),
	gifsicle = require('imagemin-gifsicle'),
	jpegtran = require('imagemin-jpegtran'),
	optipng = require('imagemin-optipng'),
	svgo = require('imagemin-svgo');
const runSequence = require('run-sequence').use(gulp);

const root_src = 'client/src';
const root_public = 'client/public';
const pkg = require('./package.json');
const banner = [
	'/*! <%= pkg.name %> v<%= pkg.version %> - <%= pkg.license %> ' +
	'license - Copyright <%= pkg.date %> author: <%= pkg.author %> */', ''
].join('\n');

const path = {
	src: {
		js: {
			src_app: `${root_src}/app/**/*.js`,
			js_lib_custom: `${root_src}/assets/js/**/*.js`,
			library_js: [
				`${root_src}/assets/libs/**/*.js`,
				`!${root_src}/assets/libs/**/*.min.js`
			]
		},
		css: {
			custom_css: `${root_src}/assets/css/**/*.css`,
			library_css: `${root_src}/assets/libs/**/*.min.css`
		},
		image: [
			`${root_src}/assets/img/**/*.png`,
			`${root_src}/assets/img/**/*.jpg`,
			`${root_src}/assets/img/**/*.jpeg`,
			`${root_src}/assets/img/**/*.gif`,
			`${root_src}/assets/img/**/*.svg`
		],
		html: `${root_src}/**/*.html`,
		font: [
			`${root_src}/assets/libs/**/*.otf`,
			`${root_src}/assets/libs/**/*.eot`,
			`${root_src}/assets/libs/**/*.svg`,
			`${root_src}/assets/libs/**/*.ttf`,
			`${root_src}/assets/libs/**/*.woff`,
			`${root_src}/assets/libs/**/*.woff2`
		],
		favicon: `${root_src}/favicon.ico`
	},
	public: {
		js: {
			src_app: `${root_public}/app`,
			js_lib_custom: `${root_public}/assets/js`,
			library_js: `${root_public}/assets/libs`
		},
		css: {
			custom_css: `${root_public}/assets/css`,
			library_css: `${root_public}/assets/libs`
		},
		image: `${root_public}/assets/img`,
		html: `${root_public}`,
		font: `${root_public}/assets/libs`,
		favicon: `${root_public}`
	}
};

/*MiniFy javascript*/
gulp.task('miniFy-js', () => {
	return gulp.src(path.src.js.src_app)
		.pipe(plumber())
		.pipe(babel({
			compact: false,
			presets: ['es2015']
		}))
		.pipe(ngAnnotate())
		.pipe(stripDebug())
		.pipe(uglify().on('error', gulpUtil.log))
		// .pipe(header(banner, {pkg: pkg}))
		.pipe(gulp.dest(path.public.js.src_app));
});

gulp.task('miniFy-js-custom', () => {
	return gulp.src(path.src.js.js_lib_custom)
		.pipe(plumber())
		.pipe(babel({
			compact: false,
			presets: ['es2015']
		}))
		.pipe(uglify().on('error', gulpUtil.log))
		.pipe(gulp.dest(path.public.js.js_lib_custom));
});

gulp.task('miniFy-library_js', ['miniFy-js-custom'], () => {
	return gulp.src(path.src.js.library_js)
		.pipe(plumber())
		.pipe(uglify().on('error', gulpUtil.log))
		.pipe(gulp.dest(path.public.js.library_js));
});

//miniFy css---------------------------------------------------------------------------------
gulp.task('miniFy-css', (cb) => {
	"use strict";
	pump([
		gulp.src(path.src.css.custom_css),
		plumber(),
		autoprefixer({
			browsers: ['last 2 version'],
			cascade: false
		}),
		minifyCSS({debug: true}, detail => {
			console.log(detail.name + ': ' + detail.stats.originalSize);
			console.log(detail.name + ': ' + detail.stats.minifiedSize);
			console.log('----------------------------------------------')
		}),
		gulp.dest(path.public.css.custom_css)
	], cb);
});

gulp.task('copy-css-lib', (cb) => {
	"use strict";
	pump([
		gulp.src(path.src.css.library_css),
		gulp.dest(path.public.css.library_css)
	], cb);
});

//compress image
gulp.task('imagemin', function () {
	return gulp.src(path.src.image)
		.pipe(plumber())
		.pipe(imagemin({
			optimizationLevel: 5,
			progressive: true,
			use: [gifsicle(), jpegtran(), optipng(), svgo()]
		}))
		.pipe(gulp.dest(path.public.image));
});

/**
 * miniFy Html
 */
gulp.task('html-minify', () => {
	return gulp.src(path.src.html)
		.pipe(plumber())
		.pipe(removeHtmlComments())
		//dat sau remove HtmlComments thi moi chay chinh xac duoc
		.pipe(removeEmptyLines())
		.pipe(gulp.dest(path.public.html));
});

/*font-copy*/
gulp.task('font-copy', () => {
	return gulp.src(path.src.font)
		.pipe(plumber())
		.pipe(gulp.dest(path.public.font));
});

/*favicon-copy*/
gulp.task('favicon-copy', () => {
	return gulp.src(path.src.favicon)
		.pipe(plumber())
		.pipe(gulp.dest(path.public.favicon));
});


/*watch file server*/
gulp.task('watch', () => {
	"use strict";
	gulp.watch(path.src.css, ['miniFy-css']);
	gulp.watch(path.src.js.src_app, ['miniFy-js']);
	gulp.watch(path.src.js.library_js, ['miniFy-library_js']);
	gulp.watch(path.src.image, ['imagemin']);
	gulp.watch(path.src.html, ['html-minify']);
});

gulp.task('build', (callback) => {
	"use strict";
	runSequence(['miniFy-js', 'miniFy-css', 'html-minify']
		, ['imagemin', 'copy-css-lib', 'miniFy-library_js']
		, callback);
});

gulp.task('default', (callback) => {
	"use strict";
	runSequence(['miniFy-js', 'miniFy-css', 'html-minify']
		, ['imagemin', 'copy-css-lib', 'font-copy', 'favicon-copy']
		, callback);
});