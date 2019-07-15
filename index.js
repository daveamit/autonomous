
const registry = {}
export const add = (name, extractor) => {
  if (registry[name]) {
    throw new Error(`processor already registered with ${name}`)
  }
  registry[name] = extractor
}

export const remove = (name) => {
  delete registry[name]
}
// If config has a kind, parse it else return the config as we don't know what to do with it.
export const resolve = (config) => config.kind ? registry[config.kind](config) : { get: () => config }

// Instance discovery
const instanceRegistry = {}
export const addInstance = (name, instance) => {
  if (instanceRegistry[name]) {
    throw new Error(`instance already registered with ${name}`)
  }
  instanceRegistry[name] = instance
}

export const removeInstance = (name) => {
  delete instanceRegistry[name]
}
// resolve Instance by name
export const resolveInstance = (name) => instanceRegistry[name]

// The Parser

export const parse = async (config) => {
  const keys = Object.keys(config)

  for (let index = 0; index < keys.length; index++) {
    const instanceName = keys[index]
    const instanceConfig = config[instanceName]
    const instance = await resolve(instanceConfig).get()
    addInstance(instanceName, instance)
  }
}
