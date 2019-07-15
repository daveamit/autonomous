import { deepStrictEqual } from 'assert'
import { addInstance, add, resolve, remove, removeInstance } from '..'
import restfulEndpoint from '../getters/restful-endpoint'
import restfulServer from '../servers/restful-server'
import moxios from 'moxios'
import sinon from 'sinon'

export default () => describe('restful-endpoint', () => {
  before(function () {
    // Match against an exact URL value
    moxios.stubRequest('http://localhost/say/hello', {
      status: 200,
      response: { said: 'hello' }
    })

    add('restful-endpoint', restfulEndpoint)
    add('restful-server', restfulServer)
    moxios.install()
  })
  after(() => {
    moxios.uninstall()
    remove('restful-endpoint', restfulEndpoint)
    remove('restful-server', restfulServer)
  })
  afterEach(() => {
    removeInstance('theServer')
  })
  it('should be able to make a call', (done) => {
    let onFulfilled = sinon.spy()

    const serverConfig = {
      kind: 'restful-server',
      host: 'localhost',
      base: '/say/hello',
      protocol: 'http',
      headers: {}
    }

    const endpointConfig = {
      kind: 'restful-endpoint',
      server: 'theServer',
      query: {
        hello: 'world',
        this: 'isAwesome'
      }
    }

    const fn = async () => {
      const theServer = await resolve(serverConfig).get()
      addInstance('theServer', theServer)
      const theEndpoint = await resolve(endpointConfig).get()
      return theEndpoint.invoke()
    }
    fn()
      .then(onFulfilled)
      .catch(done)

    moxios.wait(function () {
      deepStrictEqual(onFulfilled.getCall(0).args[0].data, { said: 'hello' })
      done()
    })
  })

  it('should be able to make a call (empty path / query)', (done) => {
    let onFulfilled = sinon.spy()

    const serverConfig = {
      kind: 'restful-server',
      host: 'localhost',
      protocol: 'http',
      headers: {}
    }

    const endpointConfig = {
      kind: 'restful-endpoint',
      server: 'theServer',
      path: '/say/hello'
    }

    const fn = async () => {
      const theServer = await resolve(serverConfig).get()
      addInstance('theServer', theServer)
      const theEndpoint = await resolve(endpointConfig).get()
      return theEndpoint.invoke()
    }
    fn()
      .then(onFulfilled)
      .catch(done)

    moxios.wait(function () {
      deepStrictEqual(onFulfilled.getCall(0).args[0].data, { said: 'hello' })
      done()
    })
  })
})
