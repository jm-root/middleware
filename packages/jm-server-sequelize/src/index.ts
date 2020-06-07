const Service = require('./service')

export = function (opts = {}) {
  const app = this || {}
  return new Service({ app, ...opts })
}
