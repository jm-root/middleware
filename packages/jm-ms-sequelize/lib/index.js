const Sequelize = require('sequelize')
const Op = Sequelize.Op
const { splitAndTrim } = require('jm-utils')
const event = require('jm-event')
const MS = require('jm-ms-core')
const ms = new MS()
const filters = require('./condition')

/**
 * CURD路由定义
 * @param {Object} model sequelize模型实体
 * @param {Object} opts 参数配置
 * @param {Object} opts.common 公共配置
 * @param {Object} opts.create 创建配置,详细配置参见:https://sequelize.org/v5/class/lib/model.js~Model.html#static-method-create
 * @param {Object} opts.list 列表配置,详细配置参见:https://sequelize.org/v5/class/lib/model.js~Model.html#static-method-findAll
 * @param {Object} opts.get 查询配置,详细配置参见:https://sequelize.org/v5/class/lib/model.js~Model.html#static-method-findAll
 * @param {Object} opts.update 更新配置,详细配置参见:https://sequelize.org/v5/class/lib/model.js~Model.html#static-method-update
 * @param {Object} opts.remove 删除配置,详细配置参见:https://sequelize.org/v5/class/lib/model.js~Model.html#static-method-destroy
 * @param {Array} opts.routes 路由选择,可选项['create', 'list', 'get', 'update', 'remove', 'save']
 * @param {Array} opts.keywords 模糊搜索字段定义,如:['name']
 * @returns {router} ms router
 */
function fn (model, opts = {}) {
  const router = ms.router(opts)
  event.enableEvent(model, {
    force: true,
    async: true
  })

  model.routes || (model.routes = { opts: {} })

  Object.assign(model.routes.opts, opts)

  const {
    common: defCommon, create: defCreate, list: defList, get: defGet, update: defUpdate, remove: defRemove, // 定义默认配置
    routes = ['create', 'list', 'get', 'update', 'remove', 'save'] // 挑选路由,默认增,删,查,改,保存
    // keywords = []
  } = model.routes.opts

  /**
   * 查询列表
   * @param {object} opts 请求选项
   * @param {object} opts.data 请求数据
   * @param {string} [opts.data.page] 第几页
   * @param {string} [opts.data.rows] 一页几行
   * @param {string} [opts.data.offset] 偏移值
   * @param {string} [opts.data.limit] 个数
   * @param {object} opts.where 查询
   * @param {array} opts.attributes 筛选字段
   * @param {array} opts.include 关联查询
   * @param {array} opts.order 排序
   * @param {boolean} opts.paranoid 是否包含删除项
   * @param {boolean} opts.raw 扁平化
   * @param {boolean} opts.plain 是否转为普通对象
   * @param {object} opts.transaction 事务对象
   * @param {object} opts.ext 扩展
   * @returns {Promise<({rows: []}|{page: number, pages: number, total: number, rows: []})|*>}
   */
  const list = async function (opts = {}) {
    let doc = await model.emit('before_list', opts)
    if (doc !== undefined) return doc

    let { page, rows, offset, limit } = opts.data

    const { conditions, where, attributes, include, order, paranoid, raw, distinct, plain = true } = opts
    const custom = { where, attributes, include, order, paranoid, raw, distinct }
    opts.ext || (opts.ext = {})
    const options = { where: {} }
    Object.assign(options, { ...defCommon, ...defList }, custom, opts.ext)

    offset && (options.offset = Number(offset))
    limit && (options.limit = Number(limit))

    // 兼容旧定义
    conditions && (options.where = { ...where, ...conditions })
    opts.fields && (options.attributes = opts.fields)
    opts.lean && (options.raw = true)

    let error
    try {
      if (page || rows) {
        page = Number(page) || 1
        rows = Number(rows) || 10
        options.offset = (page - 1) * rows
        options.limit = rows
        const { count: total, rows: data } = await model.findAndCountAll(options)
        doc = { page, pages: Math.ceil(total / rows), total, rows: data }
      } else {
        doc = await model.findAll(options)
        doc = { rows: doc }
      }
    } catch (e) {
      console.log(e)
      error = e
      doc = e
    }

    if (plain !== false && doc.rows) {
      const rows = []
      doc.rows.forEach(item => {
        rows.push(item.get({ plain: true }))
      })
      doc.rows = rows
    }
    const ret = doc
    doc = await model.emit('list', opts, doc)
    if (doc !== undefined) return doc
    if (error) throw error
    if (ret) return ret
  }

  /**
   * 获取详情
   * @param {object} opts 请求选项
   * @param {object} opts.params 请求参数
   * @param {number} opts.params.id 唯一id
   * @param {object} opts.data 请求数据
   * @param {object} opts.where 查询
   * @param {array} opts.attributes 筛选字段
   * @param {array} opts.include 关联查询
   * @param {array} opts.order 排序
   * @param {boolean} opts.paranoid 是否包含删除项
   * @param {boolean} opts.raw 扁平化
   * @param {boolean} opts.plain 是否转为普通对象
   * @param {object} opts.transaction 事务对象
   * @param {object} opts.ext 扩展
   * @returns {Promise<model>}
   */
  const get = async function (opts) {
    let doc = await model.emit('before_get', opts)
    if (doc !== undefined) return doc

    const { id } = opts.params

    const { conditions, where, attributes, include, order, paranoid, raw, plain = true } = opts
    const custom = { where, attributes, include, order, paranoid, raw }
    opts.ext || (opts.ext = {})
    const options = { where: { id } }
    Object.assign(options, { ...defCommon, ...defGet }, custom, opts.ext)

    // 兼容旧定义
    conditions && (options.where = { ...where, ...conditions })
    opts.fields && (options.attributes = opts.fields)
    opts.lean && (options.raw = true)

    let error
    try {
      doc = await model.findOne(options)
    } catch (e) {
      console.log(e)
      error = e
      doc = e
    }

    if (plain !== false && doc && doc.get) doc = doc.get({ plain: true })
    const ret = doc
    doc = await model.emit('get', opts, doc)
    if (doc !== undefined) return doc
    if (error) throw error
    if (ret) return ret
  }

  /**
   * 创建
   * @param {object} opts 请求选项
   * @param {object} opts.data 创建数据
   * @param {array} opts.fields 创建匹配的字段
   * @param {boolean} opts.plain 是否转为普通对象
   * @param {object} opts.transaction 事务对象
   * @param {object} opts.ext 扩展
   * @returns {Promise<model>}
   */
  const create = async function (opts) {
    let doc = await model.emit('before_create', opts)
    if (doc !== undefined) return doc

    const { include, raw, isNewRecord, fields, validate, hooks, plain = true } = opts
    const custom = { include, raw, isNewRecord, fields, validate, hooks, plain }
    const options = {}
    Object.assign(options, { ...defCommon, ...defCreate }, custom, opts.ext)

    let error
    try {
      doc = await model.create(opts.data, options)
    } catch (e) {
      error = e
      doc = e
    }

    let ret = doc
    doc = await model.emit('create', opts, doc)
    if (doc !== undefined) return doc
    if (error) throw error

    if (ret) {
      if (plain !== false && ret && ret.get) ret = ret.get({ plain: true })
      return ret
    }
  }

  /**
   * 更新
   * @param {object} opts 请求选项
   * @param {object} opts.params 请求参数
   * @param {number} opts.params.id 唯一id
   * @param {object} opts.data 更新数据
   * @param {object} opts.where 查询
   * @param {boolean} opts.paranoid 是否包含删除项
   * @param {array} opts.fields 更新匹配的字段
   * @param {boolean} opts.individualHooks 是否将数据回传监听函数
   * @param {object} opts.transaction 事务对象
   * @param {object} opts.ext 扩展
   * @returns {Promise<{ret: number}|*>}
   */
  const update = async function (opts) {
    let doc = await model.emit('before_update', opts)
    if (doc !== undefined) return doc

    const { id } = opts.params

    const { where, paranoid, validate, fields, hooks, individualHooks } = opts
    const custom = { where, paranoid, validate, fields, hooks, individualHooks }
    const options = { where: { id } }
    Object.assign(options, { ...defCommon, ...defUpdate }, custom, opts.ext)

    let error
    try {
      doc = await model.update(opts.data, options)
    } catch (e) {
      console.log(e)
      error = e
      doc = e
    }

    const ret = doc
    doc = await model.emit('update', opts, doc)
    if (doc !== undefined) return doc
    if (error) throw error
    if (ret) return { ret: ret[0] }
  }

  /**
   * 删除
   * @param {object} opts 请求选项
   * @param {object} opts.params 请求参数
   * @param {number} opts.params.id 唯一id
   * @param {number} opts.data.id 唯一id
   * @param {object} opts.where 查询
   * @param {number} opts.limit 删除多少
   * @param {boolean} opts.force 是否逻辑删也能直接删除
   * @param {boolean} opts.individualHooks 是否将数据回传监听函数
   * @param {object} opts.transaction 事务对象
   * @param {object} opts.ext 扩展
   * @returns {Promise<{ret: number}|*>}
   */
  const remove = async function (opts) {
    let doc = await model.emit('before_remove', opts)
    if (doc !== undefined) return doc

    const id = opts.params.id || opts.data.id
    const ids = Array.isArray(id) ? id : splitAndTrim(id)

    const { where, limit, force, hooks, individualHooks } = opts
    const custom = { where, limit, force, hooks, individualHooks }
    const options = { where: { id: { [Op.in]: ids } } }
    Object.assign(options, { ...defCommon, ...defRemove }, custom, opts.ext)

    let error
    try {
      doc = await model.destroy(options)
    } catch (e) {
      console.log(e)
      error = e
      doc = e
    }

    const ret = doc
    doc = await model.emit('remove', opts, doc)
    if (doc !== undefined) return doc
    if (error) throw error
    if (ret !== undefined) return { ret }
  }

  router.use(opts => {
    opts.data || (opts.data = {})
  })

  /**
   * 保存
   * 自动采取创建还是更新方式
   * @param {object} opts 请求选项
   * @param {object} opts.params 请求参数
   * @param {number} opts.params.id 唯一id
   * @param {number} opts.data.id 唯一id
   * @returns {Promise<Promise<model>|Promise<{ret: number}|*>>}
   */
  const save = async function (opts) {
    const data = opts.data
    if (data.id) {
      opts.params.id = data.id
      delete data.id
    }

    if (opts.params.id) {
      return update(opts)
    }
    return create(opts)
  }

  routes.includes('save') && router.add('/save', 'post', save)
  routes.includes('list') && router.add('/', 'get', list)
  routes.includes('create') && router.add('/', 'put', create)
  routes.includes('create') && router.add('/', 'post', create)
  routes.includes('remove') && router.add('/', 'delete', remove)
  routes.includes('get') && router.add('/:id', 'get', get)
  routes.includes('update') && router.add('/:id', 'put', update)
  routes.includes('update') && router.add('/:id', 'post', update)
  routes.includes('remove') && router.add('/:id', 'delete', remove)

  return router
}

Object.assign(fn, { resful: fn, ...filters })

module.exports = fn
