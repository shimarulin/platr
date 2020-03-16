const { getHomepage } = require('../lib/generatePackageUrls')

describe('Generate homepage URL', () => {
  test('GitHub', async () => {
    expect(getHomepage({
      host: 'github.com',
      owner: 'owner',
      project: 'project',
    })).toEqual('https://github.com/owner/project#readme')
  })

  test('GitHub child package', async () => {
    expect(getHomepage({
      host: 'github.com',
      owner: 'owner',
      project: 'project',
    }, 'packages/@test/output')).toEqual('https://github.com/owner/project/tree/master/packages/@test/output#readme')
  })

  test('GitLab', async () => {
    expect(getHomepage({
      host: 'gitlab.com',
      owner: 'owner',
      project: 'project',
    })).toEqual('https://gitlab.com/owner/project')
  })

  test('GitLab child package', async () => {
    expect(getHomepage({
      host: 'gitlab.com',
      owner: 'owner',
      project: 'project',
    }, 'packages/@test/output')).toEqual('https://gitlab.com/owner/project/-/tree/master/packages/@test/output')
  })

  test('Bitbucket', async () => {
    expect(getHomepage({
      host: 'bitbucket.org',
      owner: 'owner',
      project: 'project',
    })).toEqual('https://bitbucket.org/owner/project')
  })

  test('Bitbucket child package', async () => {
    expect(getHomepage({
      host: 'bitbucket.org',
      owner: 'owner',
      project: 'project',
    }, 'packages/@test/output')).toEqual('https://bitbucket.org/owner/project/src/master/packages/@test/output')
  })
})
