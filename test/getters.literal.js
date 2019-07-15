import { strictEqual } from 'assert'
import { add, resolve } from '..'
import literal from '../getters/literal'
export default () => {
  describe('literal', () => {
    before(function () {
      add('literal', literal)
    })
    it('should return actual value back - string', async () => {
      const config = {
        kind: 'literal',
        value: 'value'
      }
      const getter = resolve(config)
      strictEqual(await getter.get(), 'value')
    })
    it('should return actual value back - empty', async () => {
      const config = {
        kind: 'literal',
        value: ''
      }
      const getter = resolve(config)
      strictEqual(await getter.get(), '')
    })
    it('should return actual value back - null', async () => {
      const config = {
        kind: 'literal',
        value: null
      }
      const getter = resolve(config)
      strictEqual(await getter.get(), null)
    })
    it('should return actual value back - number', async () => {
      const config = {
        kind: 'literal',
        value: 99
      }
      const getter = resolve(config)
      strictEqual(await getter.get(), 99)
    })
  })
}
