const path = require('path')
const {
  licenses,
  resolveLicenseFile,
} = require('./lib/license')
const {
  hasMonorepo,
  projectTypes,
  defaultPackagePath,
  defaultProjectType,
  defaultLicense,
  defaultVersion,
} = require('./lib/config')

module.exports = {
  templateData () {
    return {
      year: new Date().getFullYear(),
      licenseFile: resolveLicenseFile(this.answers.license),
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
        name: 'version',
        message: 'What is package version',
        default: defaultVersion,
        when: answers => answers.type !== 'Monorepo',
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
    this.sao.opts.outDir = path.resolve(this.outDir.replace(this.outFolder, ''), defaultPackagePath, this.outFolder)
    const name = hasMonorepo ? `${defaultPackagePath.split('/').pop()}/${this.answers.name}` : this.answers.name
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
        handler: data => require('./lib/updatePkg')({
          ...this.answers,
          name,
        }, data),
      },
    ]
      .map(action => ({
        ...action, templateDir: 'templates/common',
      }))

    const configurationActions = [
      {
        type: 'add',
        files: '**',
        filters: {
          'lerna.json': this.answers.type === 'Monorepo',
        },
      },
      {
        type: 'move',
        patterns: {
          'editorconfig.ejs': '.editorconfig',
          'eslintignore.ejs': '.eslintignore',
          'eslintrc.js.ejs': '.eslintrc.js',
          'gitignore.ejs': '.gitignore',
          'prettierignore.ejs': '.prettierignore',
          'prettierrc.js.ejs': '.prettierrc.js',
        },
      },
      {
        type: 'modify',
        files: 'lerna.json',
        handler: data => require('./lib/updateLerna')({
          version: defaultVersion,
        }, data),
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
