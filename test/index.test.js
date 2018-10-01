const assert = require('yeoman-assert')
const helpers = require('yeoman-test')

const NODE = 0
const TYPESCRIPT = 1
const SCALA = 2

describe('generator-serverless:app', () => {
  const run = funcLanguage =>
    helpers
      .run(require('path').join(__dirname, '../generators/app'))
      .withPrompts({
        funcLanguage,
        packageName: 'com.example.hello',
        includeDocker: true
      })

  it('creates files for Node', () =>
    run(NODE).then(() =>
      assert.file([
        '.dockerignore',
        '.editorconfig',
        '.nvmrc',
        'src/handler.js',
        'test/handler.test.js',
        '.gitignore',
        'Dockerfile',
        'package.json',
        'README.md',
        'server.js',
        'serverless.yml',
        'webpack.config.js'
      ])
    ))

  it('creates files for TypeScript', () =>
    run(TYPESCRIPT).then(() =>
      assert.file([
        '.editorconfig',
        '.nvmrc',
        'src/handler.ts',
        'test/handler.test.ts',
        '.gitignore',
        'jest.config.js',
        'package.json',
        'README.md',
        'serverless.yml',
        'source-map-install.js',
        'tsconfig.json',
        'webpack.config.js'
      ])
    ))

  it('creates files for Scala', () =>
    run(SCALA).then(() =>
      assert.file([
        '.editorconfig',
        '.nvmrc',
        'project/build.properties',
        'project/plugins.sbt',
        'src/main/resources/log4j2.xml',
        'src/main/scala/com/example/hello/Handler.scala',
        'src/main/scala/com/example/hello/Server.scala',
        'src/test/resources/log4j2-test.xml',
        'src/test/scala/com/example/hello/HandlerSpec.scala',
        '.gitignore',
        'Dockerfile',
        'build.sbt',
        'package.json',
        'README.md',
        'serverless.yml'
      ])
    ))
})
