'use strict'
const fs = require('fs')
const sequelize = require('./sequelize')
const { readdirSync } = fs
const { Service } = require('jm-server')
module.exports = class extends Service {
  constructor (opts = {}) {
    super(opts)
    const db = sequelize(opts)
    this.sequelize = db
    const { dir = `${process.cwd()}/model`, delegate = 'model', app = {} } = opts
    app[delegate] || (app[delegate] = {})
    const model = {}
    this.model = model
    let Associations = () => { }
    Object.assign(db, { app })
    readdirSync(dir).forEach((file) => {
      if (file === 'index.js') { return }
      if (file === 'associations.js') {
        Associations = require(`${dir}/associations`)
        return
      }
      const mdl = db.import(`${dir}/${file}`)
      Object.assign(model, { [mdl.name]: mdl })
    })
    for (const idx in model) {
      const obj = model[idx]
      if (obj.associate) { obj.associate(model) }
    }
    Associations(model)
    Object.assign(app[delegate], model)
    db.sync().then(() => this.emit('ready'))
  }

  router (opts) {
    const dir = `${__dirname}/../router`
    return this.loadRouter(dir, opts)
  }
}
