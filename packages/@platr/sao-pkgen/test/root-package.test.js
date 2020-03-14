const path = require('path')
const sao = require('sao')
const generator = path.join(__dirname, '..')
const { readJsonFile } = require('./helpers/readJsonFile')

describe('Create monorepo root with default options', () => {
  const fileList = [
    '.editorconfig',
    '.eslintignore',
    '.eslintrc.js',
    '.gitignore',
    '.prettierignore',
    '.prettierrc.js',
    'lerna.json',
    'LICENSE',
    'README.md',
    'package.json',
  ].sort()
  let helper

  beforeAll(async () => {
    helper = await sao.mock({
      generator,
    },
    {
      type: 'Monorepo',
    })
    return true
  })

  test('Filesystem structure', () => {
    expect(helper.fileList.sort()).toEqual(fileList)
  })

  test('Exclude version property in "package.json"', async () => {
    const pkg = await readJsonFile(helper)

    expect(pkg.version).toBeUndefined()
  })

  test('Version property in "lerna.json"', async () => {
    const pkg = await readJsonFile(helper, 'lerna.json')

    expect(pkg.version).toEqual('0.1.0')
  })
})
