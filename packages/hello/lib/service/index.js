module.exports = class extends require('service') {
  constructor (opts = {}) {
    super(opts)
    this.emit('ready')
  }

  router (opts) {
    const dir = `${__dirname}/../router`
    return this.loadRouter(dir, opts)
  }
}
