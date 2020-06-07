const { splitAndTrim } = require('jm-utils')

/**
 * 数组化 opts.data.a='a, b,c' -> opts.data.a=['a','b','c']
 * toArray('a', 'b', ...)
 * @param keys 需要转换为数据的键
 * @returns {Function}
 */
function toArray (...keys) {
  return function ({ data = {} } = {}) {
    for (const key of keys) {
      const value = splitAndTrim(data[key])
      value && (data[key] = value)
    }
  }
}

module.exports = {
  sequelize: require('jm-ms-sequelize'),
  toArray
}
