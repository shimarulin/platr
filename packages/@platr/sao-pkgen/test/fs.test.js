const path = require('path')
const sao = require('sao')
const generator = path.join(__dirname, '..')

describe('Use default values', () => {
  const fileList = [
    '.gitignore',
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
})
