const { ms } = require('jm-server')
const { sequelize } = require('jm-ms-middleware')
export = (service: any) => {
  const { models } = service.sequelize
  const { order, fields } = sequelize
  const router: any = ms.router()
  router
    .use(order())
    .use(fields())
  for (const modelName of Object.keys(models)) {
    const model = models[modelName]
    router.use(`/${modelName}s`, sequelize.resful(model))
  }
  return router
}
