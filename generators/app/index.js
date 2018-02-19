const path = require('path')
const Generator = require('yeoman-generator')

const NODE = { name: 'Node.js', value: 0 }
const SCALA = { name: 'Scala', value: 1 }

const isNode = answers => answers.funcLanguage === NODE.value
const isScala = answers => answers.funcLanguage === SCALA.value
const validateNonEmpty = answer => answer !== undefined && answer !== ''
const validatePackageName = answer =>
  validateNonEmpty(answer) && answer.split('.').length === 3

module.exports = class extends Generator {
  prompting () {
    return this.prompt([
      {
        name: 'funcLanguage',

        message: 'Choose a language for your function:',
        type: 'list',
        choices: [NODE, SCALA]
      },
      {
        name: 'serviceName',
        message: "What's the name of your service?",
        default: path.basename(process.cwd())
      },
      {
        name: 'packageName',
        message:
          "What's the name of your package name (e.g. com.example.hello)?",
        store: true,
        validate: validatePackageName,
        when: isScala
      },
      {
        name: 'dockerNamespace',
        message: "What's your Docker namespace or username?",
        store: true,
        validate: validateNonEmpty,
        when: isNode
      },
      {
        name: 'port',
        message: 'What port will this service use locally and in Docker?',
        default: 3000,
        when: isNode
      }
    ]).then(props => (this.props = props))
  }

  writing () {
    this.log(this.props)
    const common = ['.nvmrc', '.editorconfig']
    this.props.funcLanguage === NODE.value
      ? this._writeNode(common)
      : this._writeScala(common)
  }

  _writeNode (common) {
    common
      .concat([
        'node/src/handler.js',
        'node/test/handler.test.js',
        'node/.dockerignore',
        'node/.gitignore',
        'node/Dockerfile',
        'node/package.json',
        'node/README.md',
        'node/server.js',
        'node/serverless.yml',
        'node/webpack.config.js'
      ])
      .forEach(p =>
        this.fs.copyTpl(
          this.templatePath(p),
          this.destinationPath(p.replace('node/', '')),
          {
            serviceName: this.props.serviceName,
            dockerNamespace: this.props.dockerNamespace,
            port: this.props.port
          }
        )
      )
  }

  _writeScala (common) {
    common
      .concat([
        'scala/project/assembly.sbt',
        'scala/project/build.properties',
        'scala/project/plugins.sbt',
        'scala/src/main/resources/logback.xml',
        'scala/src/main/scala/packageName/Handler.scala',
        'scala/src/main/scala/packageName/Main.scala',
        'scala/src/test/resources/logback-test.xml',
        'scala/src/test/scala/packageName/HandlerSpec.scala',
        'scala/.gitignore',
        'scala/build.sbt',
        'scala/package.json',
        'scala/README.md',
        'scala/serverless.yml'
      ])
      .forEach(p =>
        this.fs.copyTpl(
          this.templatePath(p),
          this.destinationPath(
            p
              .replace('scala/', '')
              .replace(
                'packageName/',
                `${path.join(...this.props.packageName.split('.'))}/`
              )
          ),
          {
            serviceName: this.props.serviceName,
            packageName: this.props.packageName
          }
        )
      )
  }

  install () {
    this.spawnCommandSync('git', ['init'])
    this.spawnCommandSync('nvm', ['install'])
    this.spawnCommandSync('nvm', ['use'])
    this.installDependencies({ npm: true, bower: false }).then(() =>
      this.log("You're ready to go, check out the README for more!")
    )
  }
}
