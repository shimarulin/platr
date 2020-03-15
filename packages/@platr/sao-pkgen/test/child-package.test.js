const path = require('path')
const sao = require('sao')
const generator = path.join(__dirname, '..')
const { readJsonFile } = require('./helpers/readJsonFile')

jest.mock('../lib/getCwdConfig', () => {
  return {
    packageConfig: {
      license: 'MIT',
      workspaces: [
        'packages/@test/*',
      ],
    },
    lernaConfig: {
      version: '0.1.2',
      npmClient: 'yarn',
      useWorkspaces: true,
    },
  }
})

describe('A call in the monorepo root with default values.', () => {
  const fileList = [
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

  test('Default filesystem structure', async () => {
    expect(helper.fileList.sort()).toEqual(fileList)
  })

  test('Version property in "package.json"', async () => {
    const pkg = await readJsonFile(helper)

    expect(pkg.version).toEqual('0.1.2')
    // expect(pkg.version).toBeUndefined()
  })

  test('Name property in "package.json"', async () => {
    const pkg = await readJsonFile(helper)

    expect(pkg.name).toEqual('@test/output')
  })

  test('Child package path', async () => {
    expect(helper.api.opts.outDir.search('/packages/@test/output')).not.toEqual(-1)
  })
})