import { resolve, resolveInstance } from '..'

export default ({
  server,
  method = 'get',
  path = '',
  query = '',
  data = {}
}) => {
  return {
    get: async () => {
      const invoke = async () => {
        const serverInstance = resolveInstance(server)
        const theMethod = await resolve(method).get()
        const thePath = await resolve(path).get()
        const theData = await resolve(data).get()
        let theQuery = ''

        if (query) {
          theQuery = await resolve(query).get()
          theQuery = Object
            .keys(theQuery)
            .reduce((a, c) => {
              if (a) {
                return `${a}&${c}=${theQuery[c]}`
              } else {
                return `?${c}=${theQuery[c]}`
              }
            }, '')
        }

        const response = await serverInstance[theMethod](thePath, theData)
        return response
      }

      return {
        invoke
      }
    }
  }
}
