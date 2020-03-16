const getHomepage = ({ host, owner, project }, dir = '') => {
  const projectPathPrefix = (host === 'github.com' && '/tree/master') ||
    (host === 'gitlab.com' && '/-/tree/master') ||
    (host === 'bitbucket.org' && '/src/master')
  const projectPath = dir.length > 0
    ? `${projectPathPrefix}/${dir}`
    : ''
  const readmeHash = host === 'github.com' ? '#readme' : ''
  return `https://${host}/${owner}/${project}${projectPath}${readmeHash}`
}

const getBugs = ({ host, owner, project }, dir = '') => {
  return {
    url: `https://${host}/${owner}/${project}/issues`,
  }
}

const getRepository = ({ host, owner, project }, dir = '') => {
  return {
    type: 'git',
    url: `https://${host}/${owner}/${project}.git`,
    directory: dir.length > 0 ? dir : undefined,
  }
}

module.exports = {
  getHomepage,
  getBugs,
  getRepository,
}
