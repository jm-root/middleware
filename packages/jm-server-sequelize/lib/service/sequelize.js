'use strict'
const sequelize = require('sequelize')
const _ = require('lodash')
const cls = require('cls-hooked')
const namespace = cls.createNamespace('default-namespace')
sequelize.Sequelize.useCLS(namespace)
module.exports = (opts = {}) => {
  const { uri, debug, options = {} } = opts
  const defaultOptions = {
    pool: {
      max: 100,
      min: 0,
      idle: 30000
    },
    dialectOptions: {
      supportBigNumbers: true
    },
    define: {
      collate: 'utf8mb4_unicode_ci',
      charset: 'utf8mb4'
    }
  }
  opts = _.merge(defaultOptions, options)
  if (!debug) {
    opts.logging = false
  } else {
    opts.benchmark = true
  }
  if (uri) {
    return new sequelize.Sequelize(uri, opts)
  } else {
    return new sequelize.Sequelize(opts)
  }
}
