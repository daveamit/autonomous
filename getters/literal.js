export default ({ value }) => {
  return {
    get: async () => value
  }
}
