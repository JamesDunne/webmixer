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
    extensions: [ '.tsx', '.ts', '.js' ],
    modules: ["node_modules"]
  },
  output: {
    library: 'WebmixerUI',
    libraryTarget: 'umd',
    filename: 'webmixer-ui.js',
    path: path.resolve(__dirname, 'dist')
  },
  externals: {
    webmixer: {
      amd: 'webmixer',
      commonjs: 'webmixer',
      commonjs2: 'webmixer',
      root: 'Webmixer'
    }
  }
};

module.exports = [libraryConfig];
