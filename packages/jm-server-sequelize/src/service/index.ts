import { Sequelize } from 'sequelize/types'
import fs = require('fs');
import sequelize = require('./sequelize');
const { readdirSync } = fs
const { Service } = require('jm-server')
export = class extends Service {
  private sequelize: Sequelize;
  constructor (opts: { dir?: string, delegate?:string, app?:any } = {}) {
    super(opts)
    const db = sequelize(opts)
    this.sequelize = db
    const { dir = `${process.cwd()}/model`, delegate = 'model', app = {} } = opts
    app[delegate] || (app[delegate] = {})
    const model:any = {}
    this.model = model
    let Associations: Function = () => {}

    Object.assign(db, { app })

    readdirSync(dir).forEach((file) => {
      if (file === 'index.js') return
      if (file === 'associations.js') {
        Associations = require(`${dir}/associations`)
        return
      }
      const mdl = db.import(`${dir}/${file}`)
      Object.assign(model, { [mdl.name]: mdl })
    })

    for (const idx in model) {
      const obj = model[idx]
      if (obj.associate) obj.associate(model)
    }

    Associations(model)
    Object.assign(app[delegate], model)

    db.sync().then(() => this.emit('ready'))
  }

  router (opts: any) {
    const dir = `${__dirname}/../router`
    return this.loadRouter(dir, opts)
  }
}
