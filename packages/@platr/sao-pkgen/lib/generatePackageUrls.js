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

module.exports = {
  getHomepage,
}
