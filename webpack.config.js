const path = require('path');

const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');

const config = {
    entry: {
        content: ['./src/content/index.js'],
        background: ['./src/background/index.js']
    },
    output: {
        path: path.join(__dirname, "./ext"),
        filename: 'bundle/[name].js'
    },
    plugins: [
        new WebpackNotifierPlugin({alwaysNotify: true})
    ]
};

module.exports = config;
