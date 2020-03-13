const path = require('path')
const { licenses, licenseKeys } = require('./lib/license')

module.exports = {
  templateData () {
    const licenseFileName = licenses.find(l => l.name === this.answers.license).value
    return {
      year: new Date().getFullYear(),
      licenseFile: path.resolve(__dirname, `lib/license/templates/${licenseFileName}`),
    }
  },
  prompts () {
    return [
      {
        name: 'name',
        message: 'What is the name of the new project',
        default: this.outFolder,
        filter: val => val.toLowerCase(),
      },
      {
        name: 'description',
        message: 'How would you describe the new project',
        default ({ name }) {
          return `${name} project`
        },
      },
      {
        name: 'author',
        message: 'What is your name?',
        default: this.gitUser.name,
      },
      {
        name: 'email',
        message: 'What is your email?',
        default: this.gitUser.email,
      },
      {
        name: 'origin',
        message: 'What the Git repository URL of this package?',
        default: false,
      },
      {
        name: 'license',
        message: 'Choose a license',
        type: 'list',
        choices: licenseKeys,
        default: licenseKeys[0],
      },
    ]
  },
  actions () {
    const commonActions = [
      {
        type: 'add',
        // Copy and transform all files in `template` folder into output directory
        files: '**',
      },
      {
        type: 'move',
        patterns: {
          // We keep `.gitignore` as `gitignore` in the project
          // Because when it's published to npm
          // `.gitignore` file will be ignored!
          gitignore: '.gitignore',
          '_package.json': 'package.json',
        },
      },
      {
        type: 'modify',
        files: 'package.json',
        handler: data => require('./lib/update-pkg')(this.answers, data),
      },
    ]
      .map(action => ({
        ...action, templateDir: 'templates/common',
      }))

    const configurationActions = [
      {
        type: 'add',
        // Copy and transform all files in `template` folder into output directory
        files: '**',
      },
      {
        type: 'move',
        patterns: {
          // We keep `.gitignore` as `gitignore` in the project
          // Because when it's published to npm
          // `.gitignore` file will be ignored!
          gitignore: '.gitignore',
        },
      },
    ]
      .map(action => ({
        ...action, templateDir: 'templates/configuration',
      }))
    return [
      ...commonActions,
      ...configurationActions,
    ]
  },
  async completed () {
    // this.gitInit()
    // await this.npmInstall()
    this.showProjectTips()
  },
}
