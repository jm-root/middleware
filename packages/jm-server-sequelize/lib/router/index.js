'use strict'
const { ms } = require('jm-server')
const { sequelize } = require('jm-ms-middleware')
module.exports = (service) => {
  const { order, fields } = sequelize
  const router = ms.router()
  router
    .use(order())
    .use(fields())
  for (const modelName of Object.keys(service.model)) {
    const model = service.model[modelName]
    router.use(`/${modelName}s`, sequelize.resful(model))
  }
  return router
}
