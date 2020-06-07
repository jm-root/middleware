
module.exports = function (sequelize, DataTypes) {
  const model = sequelize.define('checklist',
    {
      id: {
        type: DataTypes.STRING(50),
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(150),
        comment: '名称'
      },
      info: {
        type: DataTypes.JSON,
        comment: '检查项信息'
      }
    },
    {
      tableName: 'checklist',
      createdAt: 'crtime',
      updatedAt: 'moditime',
      deletedAt: 'deltime',
      comment: '检查清单'
    })

  return model
}
