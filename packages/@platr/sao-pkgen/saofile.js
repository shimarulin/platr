const {
  licenses,
  resolveLicenseFile,
} = require('./lib/license')
const {
  hasMonorepo,
  projectTypes,
  defaultProjectType,
  defaultLicense,
  defaultVersion,
} = require('./lib/config')

module.exports = {
  templateData () {
    return {
      year: new Date().getFullYear(),
      licenseFile: resolveLicenseFile(this.answers.license),
      version: defaultVersion,
    }
  },
  prompts () {
    return [
      {
        name: 'type',
        message: 'Choose a project type',
        type: 'list',
        choices: projectTypes,
        default: defaultProjectType,
        when: !hasMonorepo,
      },
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
        choices: licenses,
        default: defaultLicense,
      },
    ]
  },
  actions () {
    const actions = []
    const commonActions = [
      {
        type: 'add',
        files: '**',
      },
      {
        type: 'move',
        patterns: {
          '_package.json': 'package.json',
        },
      },
      {
        type: 'modify',
        files: 'package.json',
        handler: data => require('./lib/updatePkg')(this.answers, data),
      },
    ]
      .map(action => ({
        ...action, templateDir: 'templates/common',
      }))

    const configurationActions = [
      {
        type: 'add',
        files: '**',
      },
      {
        type: 'move',
        patterns: {
          gitignore: '.gitignore',
        },
      },
    ]
      .map(action => ({
        ...action, templateDir: 'templates/configuration',
      }))

    actions.push(...commonActions)
    if (!hasMonorepo) {
      actions.push(...configurationActions)
    }
    return actions
  },
  async completed () {
    // this.gitInit()
    // await this.npmInstall()
    this.showProjectTips()
  },
}
