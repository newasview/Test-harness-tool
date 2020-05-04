const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const postCssLoader = require('./postcss-loader')

const { env } = process;

const options = {
  mode: env.NODE_ENV,
  entry: './src/index.js',
  output: {
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
	  {
		test: /\.css$/,
		use: ['style-loader', 'css-loader'],
	  },
	  {
		test: /\.s(a|c)ss$/,
		use: [
		 'style-loader',
		 {
			loader: 'css-loader',
			options: {
			  importLoaders: 2,
			  localsConvention: 'camelCaseOnly',
			  modules: {
				mode: 'local',
				localIdentName: '[path][name]__[local]--[hash:base64:5]',
			  }
			},
		 },
		 {
			loader: 'sass-loader',
			options: {
			  sassOptions: {
				includePaths: [
				  path.join(__dirname, './node_modules'),
			    ],
		 	  },
			},
		 },
		],
	  }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV) }),
    new HtmlWebpackPlugin()
  ],
  devServer: {
    hot: true
  },
  devtool: env.NODE_ENV === 'development' ? 'cheap-module-eval-source-map' : undefined
};

module.exports = options;
