import { deepStrictEqual } from 'assert'
import { add, remove, resolve } from '..'
import restfulServer from '../servers/restful-server'
import moxios from 'moxios'
import sinon from 'sinon'

export default () => describe('restful-server', () => {
  before(function () {
    // Match against an exact URL value
    moxios.stubRequest('http://localhost/say/hello', {
      status: 200,
      response: { said: 'hello' }
    })

    add('restful-server', restfulServer)
    moxios.install()
  })
  after(() => {
    moxios.uninstall()
    remove('restful-server', restfulServer)
  })
  it('should be able to make get calls', (done) => {
    let onFulfilled = sinon.spy()

    const config = {
      kind: 'restful-server',
      host: 'localhost',
      protocol: 'http',
      headers: {}
    }
    resolve(config)
      .get()
      .then((getter) => {
        getter
          .get('/say/hello')
          .then(onFulfilled)
          .catch(done)
      })
      .catch(done)

    moxios.wait(function () {
      deepStrictEqual(onFulfilled.getCall(0).args[0].data, { said: 'hello' })
      done()
    })
  })

  it('should be able to make post calls', (done) => {
    let onFulfilled = sinon.spy()

    const config = {
      kind: 'restful-server',
      host: 'localhost'
    }
    const payload = { some: 'data' }
    resolve(config)
      .get()
      .then((getter) => {
        getter
          .post('/say/hello', payload)
          .then(onFulfilled)
          .catch(done)
      })
      .catch(done)

    moxios.wait(function () {
      let request = moxios.requests.mostRecent()
      deepStrictEqual(JSON.parse(request.config.data), payload)
      deepStrictEqual(onFulfilled.getCall(0).args[0].data, { said: 'hello' })
      done()
    })
  })

  it('should be able to make put calls', (done) => {
    let onFulfilled = sinon.spy()

    const config = {
      kind: 'restful-server',
      host: 'localhost'
    }
    const payload = { some: 'data' }
    resolve(config)
      .get()
      .then((getter) => {
        getter
          .put('/say/hello', payload)
          .then(onFulfilled)
          .catch(done)
      })
      .catch(done)

    moxios.wait(function () {
      let request = moxios.requests.mostRecent()
      deepStrictEqual(JSON.parse(request.config.data), payload)
      deepStrictEqual(onFulfilled.getCall(0).args[0].data, { said: 'hello' })
      done()
    })
  })

  it('should be able to make patch calls', (done) => {
    let onFulfilled = sinon.spy()

    const config = {
      kind: 'restful-server',
      host: 'localhost'
    }
    const payload = { some: 'data' }
    resolve(config)
      .get()
      .then((getter) => {
        getter
          .patch('/say/hello', payload)
          .then(onFulfilled)
          .catch(done)
      })
      .catch(done)

    moxios.wait(function () {
      let request = moxios.requests.mostRecent()
      deepStrictEqual(JSON.parse(request.config.data), payload)
      deepStrictEqual(onFulfilled.getCall(0).args[0].data, { said: 'hello' })
      done()
    })
  })
  it('should be able to make delete calls', (done) => {
    let onFulfilled = sinon.spy()

    const config = {
      kind: 'restful-server',
      host: 'localhost'
    }
    const payload = { some: 'data' }
    resolve(config)
      .get()
      .then((getter) => {
        getter
          .delete('/say/hello', payload)
          .then(onFulfilled)
          .catch(done)
      })
      .catch(done)

    moxios.wait(function () {
      let request = moxios.requests.mostRecent()
      deepStrictEqual(JSON.parse(request.config.data), payload)
      deepStrictEqual(onFulfilled.getCall(0).args[0].data, { said: 'hello' })
      done()
    })
  })
})
