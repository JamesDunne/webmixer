const path = require('path');
const webpack = require('webpack');

var siteConfig = {
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    hot: true,
    inline: true
  },
  entry: {
    main: './src/main.ts'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    modules: [
      path.resolve(__dirname),
      "node_modules"
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
};

module.exports = [siteConfig];
