const config = require('../../../config')
const $ = require('../lib')
config.path = `${__dirname}/../../../config/schema`
config.uri = 'mysql://root:123@mysql.l.jamma.cn/main'
const service = $(config)
module.exports = service
