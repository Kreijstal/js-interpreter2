const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'source-map', // or 'inline-source-map'
  target: 'node', // Add this line
  entry: './js-interpreter.js',
  output: {
    filename: 'interpreter.umd.js',
    path: path.resolve(__dirname),
    library: 'Interpreter',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [path.resolve(__dirname, 'js-interpreter')],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  resolve: {
    fallback: {
      "vm": require.resolve("vm-browserify"),
    },
  },
    plugins: [
    new webpack.ProvidePlugin({
      global: `(function() {
        if (typeof globalThis !== 'undefined') return globalThis;
        if (typeof self !== 'undefined') return self;
        if (typeof window !== 'undefined') return window;
        if (typeof global !== 'undefined') return global;
        throw new Error('Unable to locate global object');
      })()`,
    }),
  ],
};
