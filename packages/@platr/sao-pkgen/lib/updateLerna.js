module.exports = (
  { version },
  data,
) => {
  return {
    version,
    ...data,
  }
}
