import { parse, add, remove, resolve, removeInstance, addInstance, resolveInstance } from '..'
import { strictEqual } from 'assert'

export default () => {
  describe('configuration registry', () => {
    afterEach(() => {
      remove('test')
    })

    it('should be able to add and resolve', () => {
      const fn = () => {}
      add('test', () => fn)

      strictEqual(resolve({ 'kind': 'test' }), fn)
    })

    it('should throw error if add twice', () => {
      const fn = () => {}
      add('test', () => fn)

      try {
        add('test', () => fn)
        throw new Error('Must not be able to add processor with same name twice')
      } catch (e) {
        strictEqual(e.message, 'processor already registered with test')
      }
    })

    it('should able to add then remove then add again', () => {
      const fn = () => {}
      add('test', () => fn)
      remove('test')
      try {
        add('test', () => fn)
        strictEqual(resolve({ 'kind': 'test' }), fn)
      } catch (e) {
        throw new Error('Must not be able to add processor with same name twice')
      }
    })
  })

  describe('instance registry', () => {
    afterEach(() => {
      removeInstance('test')
    })

    it('should be able to add and resolve', () => {
      const fn = () => {}
      addInstance('test', fn)

      strictEqual(resolveInstance('test'), fn)
    })

    it('should throw error if add twice', () => {
      const fn = () => {}
      addInstance('test', () => fn)

      try {
        addInstance('test', () => fn)
        throw new Error('Must not be able to add processor with same name twice')
      } catch (e) {
        strictEqual(e.message, 'instance already registered with test')
      }
    })

    it('should able to add then remove then add again', () => {
      const fn = () => {}
      addInstance('test', fn)
      removeInstance('test')
      try {
        addInstance('test', fn)
        strictEqual(resolveInstance('test'), fn)
      } catch (e) {
        console.log(e)
        throw new Error('Must not be able to add processor with same name twice')
      }
    })
  })

  describe('parser', () => {
    before(() => {
      add('kind1', () => ({ get: () => Promise.resolve('kind1') }))
      add('kind2', () => ({ get: () => Promise.resolve('kind2') }))
    })
    it('should instantiate objects with proper names', async () => {
      const config = {
        'one': {
          kind: 'kind1'
        },
        'two': {
          kind: 'kind2'
        }
      }

      await parse(config)

      strictEqual(resolveInstance('one'), 'kind1')
      strictEqual(resolveInstance('two'), 'kind2')
    })
  })
}
