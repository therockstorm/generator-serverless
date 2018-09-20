const path = require('path')
const Generator = require('yeoman-generator')

const NODE = { name: 'Node.js', value: 0 }
const TYPESCRIPT = { name: 'TypeScript', value: 1 }
const SCALA = { name: 'Scala', value: 2 }

const isTypeScript = answers => answers.funcLanguage === TYPESCRIPT.value
const isScala = answers => answers.funcLanguage === SCALA.value
const dockerPrompt = answers => answers.includeDocker && !isTypeScript(answers)
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
        choices: [NODE, TYPESCRIPT, SCALA]
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
        validate: validatePackageName,
        when: isScala
      },
      {
        type: 'confirm',
        name: 'includeDocker',
        message: 'Would you like to generate a Dockerfile?',
        when: answers => !isTypeScript(answers)
      },
      {
        name: 'dockerNamespace',
        message: "What's your Docker namespace or username?",
        validate: validateNonEmpty,
        when: dockerPrompt
      },
      {
        name: 'port',
        message: 'What port will this service use locally and in Docker?',
        default: 3000,
        when: dockerPrompt
      }
    ]).then(props => (this.props = props))
  }

  writing () {
    this.log(this.props)
    const common = ['.nvmrc', '.editorconfig']

    switch (this.props.funcLanguage) {
      case TYPESCRIPT.value:
        return this._writeTypeScript(common)
      case SCALA.value:
        return this._writeScala(common)
      default:
        return this._writeNode(common)
    }
  }

  _writeNode (common) {
    if (this.props.includeDocker) {
      common = common.concat([
        'node/Dockerfile',
        'node/.dockerignore',
        'node/server.js'
      ])
    }

    common
      .concat([
        'node/src/handler.js',
        'node/test/handler.test.js',
        'node/.gitignore',
        'node/package.json',
        'node/README.md',
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

  _writeTypeScript (common) {
    common
      .concat([
        'typeScript/src/handler.ts',
        'typeScript/test/handler.test.ts',
        'typeScript/.gitignore',
        'typeScript/package.json',
        'typeScript/README.md',
        'typeScript/serverless.yml',
        'typeScript/source-map-install.js',
        'typeScript/tsconfig.json',
        'typeScript/webpack.config.js'
      ])
      .forEach(p =>
        this.fs.copyTpl(
          this.templatePath(p),
          this.destinationPath(p.replace('typeScript/', '')),
          { serviceName: this.props.serviceName }
        )
      )
  }

  _writeScala (common) {
    if (this.props.includeDocker) {
      common = common.concat([
        'scala/Dockerfile',
        'scala/src/main/scala/packageName/Server.scala'
      ])
    }

    common
      .concat([
        'scala/project/build.properties',
        'scala/project/plugins.sbt',
        'scala/src/main/resources/log4j2.xml',
        'scala/src/main/scala/packageName/Handler.scala',
        'scala/src/test/resources/log4j2-test.xml',
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
            packageName: this.props.packageName,
            dockerNamespace: this.props.dockerNamespace,
            port: this.props.port
          }
        )
      )
  }

  install () {
    this.spawnCommandSync('git', ['init'])
    this.spawnCommandSync('nvm', ['install'])
    this.spawnCommandSync('nvm', ['use'])
    this.installDependencies({ npm: true, bower: false })
  }
}
