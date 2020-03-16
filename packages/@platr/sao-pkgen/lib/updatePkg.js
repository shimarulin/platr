const { parseRepositoryUrl } = require('./parseRepositoryUrl')
const { getHomepage, getBugs, getRepository } = require('./generatePackageUrls')
const when = (condition, value, fallback) => (condition ? value : fallback)

module.exports = (
  {
    name,
    description,
    license,
    version,
    origin,
  },
  data,
  { dir },
) => {
  const urlParts = parseRepositoryUrl(origin)
  return {
    name,
    description,
    license,
    version,
    homepage: when(origin, getHomepage(urlParts, dir)),
    bugs: when(origin, getBugs(urlParts, dir)),
    repository: when(origin, getRepository(urlParts, dir)),
  }
}
