const assert = require('yeoman-assert')
const helpers = require('yeoman-test')

const NODE = 0
const SCALA = 1

describe('generator-serverless:app', () => {
  const run = funcLanguage =>
    helpers
      .run(require('path').join(__dirname, '../generators/app'))
      .withPrompts({
        funcLanguage,
        packageName: 'com.example.hello'
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

  it('creates files for Scala', () =>
    run(SCALA).then(() =>
      assert.file([
        '.editorconfig',
        '.nvmrc',
        'project/assembly.sbt',
        'project/build.properties',
        'project/plugins.sbt',
        'src/main/resources/logback.xml',
        'src/main/scala/com/example/hello/Handler.scala',
        'src/main/scala/com/example/hello/Server.scala',
        'src/test/resources/logback-test.xml',
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
