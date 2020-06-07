import fs = require('fs');
import sequelize = require('./sequelize');
const { readdirSync } = fs
const { Service } = require('jm-server')
export = class extends Service {
  constructor (opts: { dir?: string, app?:any } = {}) {
    super(opts)
    const db = sequelize(opts)
    this.sequelize = db
    const { dir = `${process.cwd()}/model`, app = {} } = opts
    let Associations: Function = () => {}
    Object.assign(db, { app })

    readdirSync(dir).forEach((file) => {
      if (file === 'index.js') return
      if (file === 'associations.js') {
        Associations = require(`${dir}/associations`)
        return
      }
      db.import(`${dir}/${file}`)
    })

    const { models } = db
    for (const idx in models) {
      const obj = models[idx]
      if (obj.associate) obj.associate(models)
    }

    Associations(models)

    db.sync().then(() => this.emit('ready'))
  }

  router (opts: any) {
    const dir = `${__dirname}/../router`
    return this.loadRouter(dir, opts)
  }
}
