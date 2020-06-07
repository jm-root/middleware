const { ms } = require('jm-server')

module.exports = function (service) {
  const router = ms.router()
  router
    .use(opts => {
      console.log(opts)
      return service.router.request(opts)
    })
  return router
}
