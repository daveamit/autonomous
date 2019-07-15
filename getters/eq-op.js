import { resolve } from '..'

export default ({ ops: opsConfig }) => {
  const ops = opsConfig.map((v) => resolve(v))

  return {
    get: async () => ops.reduce(async (a, c, i) => {
      const tillNow = await a

      if (i < ops.length - 1) {
        return tillNow && (await c.get() === await ops[i + 1].get())
      }
      return a
    }, Promise.resolve(true))
  }
}
