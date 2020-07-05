const path = require('path')
const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  prompting () {
    return this.prompt([
      {
        name: 'serviceName',
        message: "What's the name of your service?",
        default: path.basename(process.cwd())
      }
    ]).then((ps) => (this.props = ps))
  }

  writing () {
    this.log(this.props)

    return [
      '.editorconfig',
      '.nvmrc',
      'typeScript/src/handler.ts',
      'typeScript/test/handler.test.ts',
      'typeScript/gitignore',
      'typeScript/.eslintrc',
      'typeScript/package.json',
      'typeScript/prettier.config.js',
      'typeScript/README.md',
      'typeScript/serverless.js',
      'typeScript/tsconfig.json',
      'typeScript/webpack.config.js'
    ].forEach((p) =>
      this.fs.copyTpl(
        this.templatePath(p),
        this.destinationPath(
          p.replace('typeScript/', '').replace('gitignore', '.gitignore')
        ),
        { serviceName: this.props.serviceName }
      )
    )
  }

  install () {
    this.spawnCommandSync('git', ['init'])
    this.installDependencies({ npm: true, bower: false })
  }
}
