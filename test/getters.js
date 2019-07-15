import eqOp from './getters.eq-op'
import literal from './getters.literal'
import registry from './getters.registry'
import restfulEndpoint from './getters.restful-endpoint'

describe('Getters', function () {
  registry()
  eqOp()
  literal()
  restfulEndpoint()
})
