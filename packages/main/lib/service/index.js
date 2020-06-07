const { Service, ms } = require('jm-server')
module.exports = class extends Service {
  constructor (opts = {}) {
    super(opts)
    this.app = opts.app

    this.emit('ready')
  }

  router (opts) {
    const dir = `${__dirname}/../router`
    const router = this.loadRouter(dir, opts)
    this.router = router

    const routerT = ms.router()
    routerT
      .use(opts => {
        return new Promise((resolve, reject) => {
          const { modules: { orm } } = this.app
          orm.sequelize.transaction(async () => {
            try {
              const doc = await router.request(opts)
              resolve(doc)
            } catch (e) {
              reject(e)
              throw e
            }
          })
        })
      })

    return routerT
  }
}
