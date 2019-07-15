import { resolve } from './index'

export default ({ if: ifConfig, then: thenConfig, else: elseConfig }) => {
  const i = resolve(ifConfig)
  const e = resolve(elseConfig)
  const then = resolve(thenConfig)

  return {
    get: () => {
      if (i.get()) {
        return then.get()
      } else {
        return e.get()
      }
    }
  }
}
