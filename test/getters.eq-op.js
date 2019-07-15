import { strictEqual } from 'assert'
import { add, resolve } from '..'
import opEq from '../getters/eq-op'
export default () => describe('eq-op', () => {
  before(function () {
    add('eq-op', opEq)
  })
  it('should return true for equal literal (string)', async () => {
    const config = {
      kind: 'eq-op',
      ops: [
        'value',
        'value'
      ]
    }
    const getter = resolve(config)
    strictEqual(await getter.get(), true)
  })

  it('should return true for equal literal (number)', async () => {
    const config = {
      kind: 'eq-op',
      ops: [
        1,
        1
      ]
    }
    const getter = resolve(config)
    strictEqual(await getter.get(), true)
  })

  it('should return false for unequal literal (string)', async () => {
    const config = {
      kind: 'eq-op',
      ops: [
        'value',
        'wrongValue'
      ]
    }
    const getter = resolve(config)
    strictEqual(await getter.get(), false)
  })

  it('should return false for unequal literal (number)', async () => {
    const config = {
      kind: 'eq-op',
      ops: [
        1,
        11
      ]
    }
    const getter = resolve(config)
    strictEqual(await getter.get(), false)
  })
})
