import { resolve } from '..'
import axios from 'axios'

export default ({
  host: hostConfig,
  base: baseConfig = '',
  protocol: protocolConfig = 'http',
  headers: headersConfig = {}
}) => {
  const hostGetter = resolve(hostConfig)
  const baseGetter = resolve(baseConfig)
  const protocolGetter = resolve(protocolConfig)
  const headersGetter = resolve(headersConfig)

  return {
    get: () => {
      const config = async () => {
        const protocol = await protocolGetter.get()
        const host = await hostGetter.get()
        const base = await baseGetter.get()
        const headers = await headersGetter.get()
        const baseURL = `${protocol}://${host}${base}`
        return {
          baseURL,
          headers: headers
        }
      }

      const get = async (url) => axios({
        ...(await config()),
        method: 'get',
        url,
        responseType: 'json'
      })
      const post = async (url, data) => axios({
        ...(await config()),
        method: 'post',
        data,
        url,
        responseType: 'json'
      })

      const patch = async (url, data) => axios({
        ...(await config()),
        method: 'patch',
        data,
        url,
        responseType: 'json'
      })

      const put = async (url, data) => axios({
        ...(await config()),
        method: 'put',
        data,
        url,
        responseType: 'json'
      })

      const deleteMethod = async (url, data) => axios({
        ...(await config()),
        method: 'delete',
        data,
        url,
        responseType: 'json'
      })

      return Promise.resolve({
        get,
        post,
        patch,
        delete: deleteMethod,
        put
      })
    }
  }
}
