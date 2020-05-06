const { Service } = require('jm-server')
const log = require('jm-log4js')
const t = require('locale')

const logger = log.getLogger('main')

module.exports = class extends Service {
  constructor (opts = {}) {
    super(opts)
    const { gateway, debug, app } = opts
    debug && (logger.setLevel('debug'))

    Object.assign(this, { app, logger, t })

    if (gateway) {
      require('./gateway')({ gateway })
        .then(doc => { this.gateway = doc })
    }
  }
}
