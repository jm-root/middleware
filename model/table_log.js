module.exports = function (sequelize, DataTypes) {
  const model = sequelize.define('tableLog',
    {
      userId: {
        type: DataTypes.STRING(50),
        comment: '操作用户id',
        allowNull: false
      },
      tableName: {
        type: DataTypes.STRING(50),
        comment: '操作表',
        allowNull: false
      },
      tableId: {
        type: DataTypes.STRING(50),
        comment: '操作id',
        allowNull: false
      },
      type: {
        type: DataTypes.TINYINT(4),
        comment: '操作类型(1:增 2:改 3:删)',
        allowNull: false
      },
      title: {
        type: DataTypes.STRING(255),
        comment: '操作描述',
        allowNull: false
      },
      content: {
        type: DataTypes.JSON,
        comment: '操作数据'
      }
    },
    {
      tableName: 'table_log',
      createdAt: 'crtime',
      updatedAt: 'moditime',
      deletedAt: 'deltime',
      comment: '数据表操作记录'
    })

  /**
   * 是否存在编辑
   * @param {string} tableName 操作表名
   * @param {string} tableId 操作id项
   * @param {string} userId 操作用户
   * @returns {Promise<boolean>} -
   */
  model.hasEdit = async function (tableName, tableId, userId) {
    const where = { tableName, tableId, type: 2 }
    userId && (where.userId = userId)
    const log = await model.findOne({ where })
    return !!log
  }

  return model
}
