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
          '.nvmrc',
          'src/handler.ts',
          'test/handler.test.ts',
          '.eslintrc',
          '.gitignore',
          'package.json',
          'prettier.config.js',
          'README.md',
          'serverless.js',
          'tsconfig.json',
          'webpack.config.js'
        ])
      ))
})
