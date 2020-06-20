const { ms } = require('jm-server')
const { sequelize } = require('jm-ms-middleware')
export = (service: any) => {
  const { models } = service.sequelize
  const { order, fields, filter, search } = sequelize
  const router: any = ms.router()
  router
    .use(order())
    .use(fields())
  for (const modelName of Object.keys(models)) {
    const model = models[modelName]
    const rootResource = `/${modelName}s`

    const keywords = model.routes && model.routes.opts && model.routes.opts.keywords
    keywords && router.use(rootResource, search('where', 's', ...keywords))

    if (model.tableAttributes) {
      const keys = Object.keys(model.tableAttributes)
      router.use(rootResource, filter('where', ...keys))
    }

    router.use(rootResource, sequelize.resful(model))
  }
  return router
}
