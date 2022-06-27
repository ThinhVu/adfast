//Todo multiple Loader
//Todo content loader

'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const root_path = `./client/src`;

module.exports = function makeWebpackConfig(option) {

	/**
	 * environment config type
	 * BUILD: minify css,js, html
	 * BUILD: minify css,js, html
	 * DEV: minify css, js, html, write source-map
	 * TEST: hot server default, not minify
	 */
	const BUILD = option.BUILD;
	const DEV = option.DEV;
	const TEST = option.TEST;

	let config = {};

	/** -----------------------------------------------------------------------------------
	 * entry-app config
	 */
	config.entry = {
		app: [`${root_path}/assets/css/app.style.css`, `${root_path}/app.js`],
		vendors: [
			'jquery',
			'bootstrap',
			'angular',
			'angular-ui-router'
		]
	};

	/** -----------------------------------------------------------------------------------
	 * output-config
	 */
	if (DEV) {
		config.output = {
			path: `./dist`,
			filename: `[name].js`,
			publicPath: `http://localhost:8080`
		}
	} else {
		config.output = {
			path: DEV ? `./dist` : (BUILD ? `./dist/client/public` : `./client/test`),
			filename: BUILD ? `[name]-[hash].min.js` : `[name].js`,
			publicPath: '/'
		}
	}

	/** -----------------------------------------------------------------------------------
	 * dev-tool config
	 */
	if (DEV) {
		config.devtool = 'inline-source-map';
	} else if (TEST) {
		config.devtool = 'source-map';
	} else {
		config.devtool = null;
	}

	/** -----------------------------------------------------------------------------------
	 * resolve config extension: javascript, style, es6
	 * @type {{extensions: string[]}}
	 */
	config.resolve = {
		extensions: ['', '.js', '.css', '.es6']
	};

	/** -----------------------------------------------------------------------------------
	 * loader config (use- BUILD, DEV, TEST)
	 * @type {*[]}
	 */
	config.module = {
		preLoaders: [],
		loaders: [
			/*Load cac image ben trong html*/
			{
				test: /\.(html)$/,
				loader: 'html'
			},
			{test: /\.json$/, loader: 'json-loader'},
			{
				test: /\.js$/,
				exclude: /(node_module|server)/,
				loaders: BUILD ? [
						'ng-annotate?single_quotes',
						'babel?presets[]=es2015',
						'strip-loader?strip[]=debug,strip[]=console.log'
					] : [
						'ng-annotate?single_quotes',
						'babel?presets[]=es2015'
					]
			},
			{
				test: /\.(woff|woff2|eot|ttf)(\?.*$|$)/,
				loader: 'file',
				exclude: /(node_module|server)/,
				query: {
					name: 'assets/libs/font/[name].[ext]'
				}
			}
		],
		postLoaders: []
	};

	/*switch preLoaders environment*/
	/*if (!BUILD) {
	 config.module.preLoaders.push({
	 test: /\.*js/,
	 exclude: /(node_module|server)/,
	 loader: 'jshint'
	 });
	 }*/

	/*switch loader environment*/
	if (DEV) {
		config.module.loaders.push(
			{
				test: /\.css$/,
				exclude: /(node_module|server)/,
				loaders: [
					'style',
					'css',
					'resolve-url',
					'postcss'
				]
			},
			{
				test: /\.template.html$/,
				loader: 'file?name=[name].html'
			},
			{
				test: /\.(png|jpg|jpeg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				exclude: /(node_module|server)/,
				loader: 'url',
				query: {
					name: '[path][name].[ext]',
					limit: 10240000  //9.7MB
				}
			}
		);
	}
	else {  //env: BUILD -TEST
		config.module.loaders.push(
			{
				test: /\.css$/,
				exclude: /(node_module|server)/,
				loader: ExtractTextPlugin.extract([
					'css?sourceMap',
					'resolve-url',
					'postcss'
				])
			},
			TEST ?
				{
					test: /\.(png|jpg|jpeg|gif|svg)(\?.*$|$)$/,
					exclude: /(node_module|server)/,
					loader: 'url?name=assets/img/[name].[ext]&limit=10240'
				} :
				{
					test: /\.(png|jpg|jpeg|gif|svg)(\?.*$|$)$/,
					exclude: /(node_module|server)/,
					loaders: [
						'url?name=assets/img/img-[sha512:hash:base64:7].[ext]&limit=10240',
						`image-webpack?{optimizationLevel: 7, interlaced: false, 
            pngquant:{quality: "65-90", speed: 4}, mozjpeg: {quality: 65}}`
					]
				}
		)
	}

	/** -----------------------------------------------------------------------------------
	 * config postcss-loader
	 */
	config.postcss = [
		autoprefixer({browsers: ['last 10 versions']})
	];

	/** -----------------------------------------------------------------------------------
	 * plugin config
	 */
	config.plugins = [
		new webpack.optimize.CommonsChunkPlugin('vendor', BUILD ? 'vendor-[hash].min.js' : 'vendor.js', Infinity),
		new CopyWebpackPlugin([
			{from: 'client/src/page/404.template.html', to: 'page/404.template.html'},
			{from: 'client/src/page/about.template.html', to: 'page/about.template.html'},
			{from: 'client/src/page/contact.template.html', to: 'page/contact.template.html'},
			{from: 'client/src/page/home.template.html', to: 'page/home.template.html'}
		]),
		new webpack.BannerPlugin('author: dev-easy manhnguyen'),
		new HtmlWebpackPlugin({
			template: `./client/src/index.view.html`,
			hash: BUILD,
			cache: true,
			showErrors: false,
			minify: TEST ? false : {
					html5: true,
					collapseWhitespace: BUILD,
					removeScriptTypeAttributes: true,
					removeStyleLinkTypeAttributes: true,
					removeEmptyAttributes: true,
					minifyCSS: true,
					minifyJS: true,
					removeComments: BUILD
				},
			filename: 'index.view.html',
			favicon: './client/src/favicon.ico',
			chunks: ['vendor', 'vendors', 'app'],
			inject: 'body' //value: head =>header, true => lan lon ca 2
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jquery: 'jquery',
			'window.jQuery': 'jquery',
			jQuery: 'jquery',
			'_': 'lodash'
		})
	];

	if (BUILD || TEST) {
		config.plugins.push(
			new webpack.optimize.UglifyJsPlugin({
				minimize: true,
				comments: !BUILD, //drop comment (neu co comment => ko minify)
				compress: {
					warnings: !BUILD,  //message error when compress
					drop_console: BUILD,
					unsafe: true
				}
			}),
			new ExtractTextPlugin(BUILD ? 'assets/css/style-[hash].min.css' : 'assets/css/[name].css', {
				allChunks: true
			})
		)
	}

	/** -----------------------------------------------------------------------------------
	 * watch config
	 */
	if (!DEV) {
		config.watch = !BUILD;
	}

	/**
	 * config dev-server
	 */
	config.devServer = {
		contentBase: './dist/',
		stats: {
			modules: false,
			cached: false,
			colors: true,
			chunk: false
		}
	};

	config.node = {
		console: true,
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		global: 'window',
		process: true,
		crypto: 'empty',
		clearImmediate: false,
		setImmediate: false
	};

	return config;
};