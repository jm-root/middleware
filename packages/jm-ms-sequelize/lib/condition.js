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
 * 过滤 filter('where', 'price')
 * get /items?price[gte]=1&price[lt]=100
 * {
 * price; {
 *    gte: 1,
 *    lt: 100
 *  }
 * }
 * @param {string} [delegate='where'] 查询字段定义
 * @param {string} fields 定义可供条件查询字段
 * @returns {Function}
 */
function filter (delegate = 'where', ...fields) {
  return function (opts = {}) {
    const { data = {}, type } = opts
    if (type !== 'get') return
    opts[delegate] || (opts[delegate] = {})
    const conditions = opts[delegate]
    for (const field of fields) {
      const value = data[field]
      if (!value) continue
      conditions[field] = filterValue(value)
    }
  }
}

/**
 * 模糊搜索
 * 如: get /items?s=abc
 * @param {string} [delegate='where'] 查询字段定义
 * @param {string} [key='s'] 查询参数名称定义
 * @param {string} fields 定义可供条件查询字段
 * @returns {function(...[*]=)}
 */
function search (delegate = 'where', key = 's', ...fields) {
  fields.length || (fields = [])
  return function (opts = {}) {
    const { data = {}, headers = {}, type } = opts
    const keyword = headers[key] || data[key]
    if (type !== 'get' || !keyword) return
    opts[delegate] || (opts[delegate] = {})
    const conditions = opts[delegate]
    conditions[Op.or] || (conditions[Op.or] = [])
    for (const field of fields) {
      conditions[Op.or].push({ [field]: { [Op.like]: `%${keyword}%` } })
    }
  }
}

module.exports = {
  order,
  fields,
  filter,
  search
}
