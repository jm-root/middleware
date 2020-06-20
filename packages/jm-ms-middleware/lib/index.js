const { splitAndTrim } = require('jm-utils')
const error = require('jm-err')
const Validator = require('fastest-validator')
const _validator = new Validator()

/**
 * 校验中间件
 * @param {object} schema 校验定义
 * @param {function} handler 函数
 * @returns {function} -
 */
function validator (schema, handler) {
  const check = _validator.compile(schema)
  return function validateParams (opts) {
    const params = Object.assign(opts.params, opts.data)
    const res = check(params)
    if (res === true) {
      if (handler) {
        return handler(opts)
      }
    } else {
      throw error.err({ ...error.Err.FA_VALIDATION, data: res })
    }
  }
}

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
  toArray,
  validator
}
