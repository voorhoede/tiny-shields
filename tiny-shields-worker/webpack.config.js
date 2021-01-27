const path = require('path');

module.exports = {
  entry: './main.js',
  target: 'webworker',
  resolve: {
    alias: {
      fs: path.resolve(__dirname, './fs-mock.js'),
    },
  },
  mode: 'production',
  optimization: {
    usedExports: true,
  },
};
