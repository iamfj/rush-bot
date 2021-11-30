const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = () => {
  return {
    target: 'node',
    externals: [nodeExternals()],
    entry: {
      rush: './src/rush.ts'
    },
    mode: (process.env.NODE_ENV === 'production') ? 'production' : 'development',
    output: {
      path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
      minimize: process.env.NODE_ENV === 'production',
    },
    module: {
      rules: [
        {
          test: /\.(ts)$/i,
          loader: 'ts-loader',
          exclude: ['/node_modules/'],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
      modules: ['node_modules'],
    },
  };
};
