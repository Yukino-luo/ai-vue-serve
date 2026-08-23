import test from './test.js'
import user from './user.js'
import common from './common.js'
import goods from './goods.js'

const routes = {
  test,
  user,
  common,
  goods
}

const loadRoutes = (app) => {
  for (const key in routes) {
    app.use(routes[key].routes());
    app.use(routes[key].allowedMethods());
  }
}

export default loadRoutes
