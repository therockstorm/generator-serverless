const path = require('path')
const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  prompting () {
    const prompts = [
      {
        name: 'serviceName',
        message: "What's the name of your service?",
        default: path.basename(process.cwd())
      },
      {
        name: 'functionName',
        message: "What's the name of your function?",
        default: 'func'
      },
      {
        name: 'dockerNamespace',
        message: "What's your Docker namespace or username?"
      },
      {
        name: 'port',
        message: 'What port will this service use locally and in Docker?',
        default: 3000
      }
    ]

    return this.prompt(prompts).then(props => (this.props = props))
  }

  writing () {
    ;[
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
    ].forEach(p =>
      this.fs.copyTpl(this.templatePath(p), this.destinationPath(p), {
        serviceName: this.props.serviceName,
        functionName: this.props.functionName,
        dockerNamespace: this.props.dockerNamespace,
        port: this.props.port
      })
    )
  }

  install () {
    this.spawnCommandSync('git', ['init'])
    this.spawnCommandSync('nvm', ['install'])
    this.spawnCommandSync('nvm', ['use'])
    this.installDependencies({ npm: true, bower: false }).then(() =>
      console.log("You're ready to go, check out the README for more!")
    )
  }
}
