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
    const { DataTypes } = db.Sequelize
    const { dir = `${process.cwd()}/model`, app = {}, sync } = opts
    Object.assign(db, { app })
    // 如果存在 index.js 或者 index/index.js 所有工作由 require('/index') 完成
    let hasIndex = false
    try {
      const fn = require(`${dir}`)
      fn(db, DataTypes)
      hasIndex = true
    } catch (e) {
    }
    if (!hasIndex) {
      readdirSync(dir)
        .filter(function (file) {
          return (file !== 'associations.js') && (file !== 'associations')
        })
        .forEach((file) => {
          const fn = require(`${dir}/${file}`)
          fn && typeof fn === 'function' && (fn(db, DataTypes))
        })
      try {
        const Associations = require(`${dir}/associations`)
        Associations && (Associations(db.models))
      } catch (e) {
      }
      const { models } = db
      for (const idx in models) {
        const obj = models[idx]
        if (obj.associate) { obj.associate(models) }
      }
    }
    db.sync(sync).then(() => this.emit('ready'))
  }

  router (opts) {
    const dir = `${__dirname}/../router`
    return this.loadRouter(dir, opts)
  }
}
