const assert = require('yeoman-assert')
const helpers = require('yeoman-test')

describe('generator-serverless-node:app', () => {
  beforeEach(() =>
    helpers.run(require('path').join(__dirname, '../generators/app'))
  )

  it('creates files', () =>
    assert.file([
      'src/handler.js',
      'test/handler.test.js',
      '.dockerignore',
      '.editorconfig',
      '.gitignore',
      '.nvmrc',
      'Dockerfile',
      'package.json',
      'README.md',
      'server.js',
      'serverless.yml',
      'webpack.config.js'
    ]))
})
