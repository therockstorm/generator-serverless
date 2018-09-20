const slsw = require('serverless-webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: Object.assign({ server: './server.js' }, slsw.lib.entries),
  target: 'node',
  externals: [nodeExternals()]
}
