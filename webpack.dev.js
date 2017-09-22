const webpack = require('webpack');
const path = require('path');

const APP_DIR = path.join(__dirname, 'client/app');
const BUILD_DIR = path.join(__dirname, 'dist');

const config = {
	devServer: {
		contentBase: './dist',
		hot: true,
		filename: 'bundle.dev.js',
		port: 9002,
		proxy: {
			"/api": "http://localhost:9001"
		},
		publicPath: '/'
	},
	entry: [
		APP_DIR + '/index.tsx'
	],
	module: {
		rules: [
			{
				enforce: 'pre',
				exclude: /node_modules/,
				loader: 'eslint-loader',
				test: /\.jsx?$/
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				use: [
					{loader: "url-loader"}
				]
			},
			{
				test: /\.s?css$/,
				//exclude: /node_modules/,
				use: [
					{loader: "style-loader"},
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
							localIdentName: "[name]__[local]___[hash:base64:5]",
							modules: true,
							sourceMap: true
						}
					},
					{
						loader: "postcss-loader"
					}
				],
			},
			/*{
				test: /\.css$/,
				include: /node_modules/,
				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
							localIdentName: "[local]",
							modules: true,
							sourceMap: true
						}
					},
					{
						loader: "postcss-loader"
					}
				]
			},*/
			{
				exclude: /node_modules/,
				include: APP_DIR,
				test: /\.jsx?$/,
				use: [
					{loader: "babel-loader"}
				]
			},
			{
				loader: "awesome-typescript-loader",
				test: /\.tsx?$/
			}
		]
	},
	output: {
		filename: 'bundle.dev.js',
		path: BUILD_DIR
	},
	plugins: [
		new webpack.DefinePlugin({"process.env": {NODE_ENV: JSON.stringify('development')}}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.LoaderOptionsPlugin({
			eslint: {
				failOnWarning: false,
				failOnError: true
			},
			options: {
				context: '/'
			}
		})
	],
	resolve: {
		alias: {
			actions: path.resolve(__dirname, 'client', 'app', 'actions'),
			components: path.resolve(__dirname, 'client', 'app', 'components'),
			reducers: path.resolve(__dirname, 'client', 'app', 'reducers'),
			selectors: path.resolve(__dirname, 'client', 'app', 'selectors')
		},
		extensions: ['.scss', '.css', '.js', '.jsx', '.json', '.ts', '.tsx'],
		modules: ['node_modules']
	},
};

module.exports = config;
