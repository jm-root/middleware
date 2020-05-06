const { ms } = require('jm-server')

module.exports = function (service) {
  let router = ms.router()
  router.add('/', 'get', opts => {
    return { hello: 'world', ...opts }
  })
  return router
}
