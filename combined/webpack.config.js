const path = require("path");
const webpack = require("webpack"); // Built-in plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: "development",
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "main.js"
	},
	module: {
		rules: [
			{ // Set up a loader for react
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: "babel-loader"
			},
			{ // Set up a loader for html
				test: /\.html$/,
				use: "html-loader"
			},
			{ // Set up a loader for css
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			}, // Handle SVG files
			{
				test: /\.svg$/,
				loader: 'svg-url-loader'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "public/index.html",
			filename: "main.html",
			favicon: "./public/favicon.ico"
		}),
		// Some spice to our vanilla webpack
		new webpack.HotModuleReplacementPlugin({}), // Only for development, remove for production!	
		new webpack.ProgressPlugin(console.info) // Takes a function with (percentage, message, ...args)
	]
};
