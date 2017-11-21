const path = require('path');

var libraryConfig = {
  entry: './src/index.ts',
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
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    library: 'webmixer',
    libraryTarget: 'umd',
    filename: 'webmixer.js',
    path: path.resolve(__dirname, 'dist')
  }
};

module.exports = [libraryConfig];
