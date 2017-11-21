const path = require('path');

var libraryConfig = {
  entry: './lib/index.ts',
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
    path: path.resolve(__dirname, 'webmixer')
  }
};

var siteConfig = {
  entry: './src/main.ts',
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
    modules: [path.resolve(__dirname, "dist"), "node_modules"],
    alias: {
      webmixer: "dist/webmixer.js"
    }
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  externals: {
    webmixer: {
      amd: 'webmixer'
    }
  }
};

module.exports = [libraryConfig, siteConfig];
