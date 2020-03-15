const path = require('path')
const sao = require('sao')
const generator = path.join(__dirname, '..')
const { readJsonFile } = require('./helpers/readJsonFile')

describe('Use default values', () => {
  const fileList = [
    '.editorconfig',
    '.eslintignore',
    '.eslintrc.js',
    '.gitignore',
    '.prettierignore',
    '.prettierrc.js',
    'LICENSE',
    'README.md',
    'package.json',
  ].sort()
  let helper

  beforeAll(async () => {
    helper = await sao.mock({
      generator,
    })
    return true
  })

  test('Filesystem structure', () => {
    expect(helper.fileList.sort()).toEqual(fileList)
  })

  test('Version property in "package.json"', async () => {
    const pkg = await readJsonFile(helper)

    expect(pkg.version).toEqual('0.1.0')
  })

  test('Name property in "package.json"', async () => {
    const pkg = await readJsonFile(helper)

    expect(pkg.name).toEqual('output')
  })
})
