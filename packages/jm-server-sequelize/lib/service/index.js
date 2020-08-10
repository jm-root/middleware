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
    const { dir = `${process.cwd()}/model`, app = {} } = opts
    let Associations = () => { }
    Object.assign(db, { app })
    readdirSync(dir).forEach((file) => {
      if (file === 'index.js') { return }
      if (file === 'associations.js') {
        Associations = require(`${dir}/associations`)
        return
      }
      require(`${dir}/${file}`)(db, db.Sequelize.DataTypes)
    })
    const { models } = db
    for (const idx in models) {
      const obj = models[idx]
      if (obj.associate) { obj.associate(models) }
    }
    Associations(models)
    db.sync().then(() => this.emit('ready'))
  }

  router (opts) {
    const dir = `${__dirname}/../router`
    return this.loadRouter(dir, opts)
  }
}
