const assert = require('yeoman-assert')
const helpers = require('yeoman-test')

describe('generator-serverless:app', () => {
  it('creates files for TypeScript', () =>
    helpers
      .run(require('path').join(__dirname, '../generators/app'))
      .withPrompts({ packageName: 'com.example.hello' })
      .then(() =>
        assert.file([
          '.editorconfig',
          '.tool-versions',
          'src/handler.ts',
          'test/handler.test.ts',
          '.gitignore',
          'package.json',
          'README.md',
          'serverless.js',
          'tsconfig.json',
          'tslint.yml',
          'webpack.config.js'
        ])
      ))
})
