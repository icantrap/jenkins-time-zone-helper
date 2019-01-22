const path = require('path');

const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');

const config = {
  entry: {
    content: ['./src/content/index.js']
  },
  output: {
    path: path.join(__dirname, "./ext"),
    filename: 'bundle/[name].js'
  },
  plugins: [
    new WebpackNotifierPlugin(),
    new webpack.ProvidePlugin({$: 'jquery'})
  ]
};

if ('production' === process.env.NODE_ENV) {
  config.mode = 'production';
}
else {
  config.mode = 'development';
  config.devtool = 'source-map';
}

module.exports = config;
