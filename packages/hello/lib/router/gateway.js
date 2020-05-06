const { ms } = require('jm-server')

module.exports = function (service) {
  const router = ms.router()
  router.add('/', 'get', async opts => {
    const { gateway } = service
    await gateway.bind('config')
    const doc = await gateway.get('/')
    doc.modules.config = await gateway.config.get('/')
    return doc
  })
  return router
}
