const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  optimization: {
    usedExports: true,
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  // stats: 'errors-warnings',
};