import { Model } from 'sequelize/types'
const { ms } = require('jm-server')
const { sequelize } = require('jm-ms-middleware')
export = (service: { model: { [key: string]: typeof Model }, ready: boolean }) => {
  const { order, fields } = sequelize
  const router: any = ms.router()
  router
    .use(order())
    .use(fields())
  for (const modelName of Object.keys(service.model)) {
    const model = service.model[modelName]
    router.use(`/${modelName}s`, sequelize.resful(model))
  }
  return router
}
