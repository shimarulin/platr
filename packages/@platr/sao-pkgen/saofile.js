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
  defaultProjectUrl,
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
        message: 'Choose a package type',
        type: 'list',
        choices: projectTypes,
        default: defaultProjectType,
        when: !hasMonorepo,
      },
      {
        name: 'name',
        message: 'What is the name of the new package',
        default: this.outFolder,
        filter: val => {
          const name = val.toLowerCase()
          return hasMonorepo ? `${defaultPackagePath.split('/').pop()}/${name}` : name
        },
      },
      {
        name: 'description',
        message: 'How would you describe the new package',
        default ({ name }) {
          return `${name} package`
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
        message: 'What the Git repository URL of this package?\nFor example:\n- "git@github.com:username/package.git"\n- "https://github.com/username/package.git"\n >',
        when: !hasMonorepo,
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
    const outFolderPath = hasMonorepo ? path.join(defaultPackagePath, this.outFolder) : this.outFolder
    this.sao.opts.outDir = path.resolve(this.outDir.replace(this.outFolder, ''), outFolderPath)
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
          origin: hasMonorepo ? defaultProjectUrl : this.answers.origin,
        }, data, {
          outFolderPath,
        }),
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
