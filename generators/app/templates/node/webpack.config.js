const { join } = require('path')
const slsw = require('serverless-webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: Object.assign({ server: './server.js' }, slsw.lib.entries),
  output: {
    libraryTarget: 'commonjs',
    path: join(__dirname, 'dist'),
    filename: '[name].js'
  },
  target: 'node',
  externals: [nodeExternals({ modulesFromFile: true })],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: join(__dirname, 'node_modules'),
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [['@babel/preset-env', { targets: { node: '8.10' } }]]
          }
        }
      }
    ]
  }
}
