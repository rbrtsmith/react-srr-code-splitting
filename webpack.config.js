const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'client', 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  }
};
