const { splitAndTrim } = require('jm-utils')
const { Op } = require('sequelize')

function parserSorter (s) {
  let v = splitAndTrim(s) || s
  v = v.filter(item => !!item)
  v = v.map(item => splitAndTrim(item, ' '))
  return v
}

/**
 * 排序中间件 例如 s=moditime desc,crtime 处理后 opts[delegate]=[['moditime', 'desc'], ['crtime']]
 * @param delegate ['order'] 结果保存到 opts[delegate]
 * @param keys ['o'] 排序的键
 * @returns {Function}
 */
function order (delegate = 'order', ...keys) {
  keys.length || (keys = ['o'])
  return function (opts = {}) {
    const { headers = {}, data = {}, type } = opts
    if (type !== 'get') return
    for (const key of keys) {
      const s = headers[key] || data[key]
      s && (opts[delegate] = [...opts[delegate] || [], ...parserSorter(s)])
    }
  }
}

/**
 * 字段选择 例如 f=id,code,name 处理后 opts[delegate]=['a','b','c']
 * @param delegate ['fields'] 结果保存到 opts[delegate]
 * @param keys ['f'] 字段的键
 * @returns {Function}
 */
function fields (delegate = 'fields', ...keys) {
  keys.length || (keys = ['f'])
  return function (opts = {}) {
    const { data = {}, headers = {}, type } = opts
    if (type !== 'get') return
    for (const key of keys) {
      const f = headers[key] || data[key]
      f && (opts[delegate] = [...opts[delegate] || [], ...splitAndTrim(f)])
    }
  }
}

function filterValue (value) {
  if (typeof value !== 'object') return value
  if (Array.isArray(value)) return value
  const ret = {}
  for (const k of Object.keys(value)) {
    ret[Op[k]] = filterValue(value[k])
  }
  return ret
}

/**
 * 过滤 filter('conditions', 'price')
 * get /items?price[gte]=1&price[lt]=100
 * {
 * price; {
 *    gte: 1,
 *    lt: 100
 *  }
 * }
 * @param delegate
 * @param keys
 * @returns {Function}
 */
function filter (delegate = 'conditions', ...keys) {
  return function (opts = {}) {
    const { data = {}, type } = opts
    if (type !== 'get') return
    opts[delegate] || (opts[delegate] = {})
    const conditions = opts[delegate]
    for (const key of keys) {
      const value = data[key]
      if (!value) continue
      conditions[key] = filterValue(value)
    }
  }
}

module.exports = {
  order,
  fields,
  filter
}
