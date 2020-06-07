
module.exports = function (sequelize, DataTypes) {
  const model = sequelize.define('audit',
    {
      id: {
        type: DataTypes.STRING(50),
        primaryKey: true
      },
      type: {
        type: DataTypes.STRING(20),
        comment: '审核类型'
      },
      state: {
        type: DataTypes.INTEGER,
        comment: '单位备案状态：0未提交 1待审核 2不通过 3已办结',
        defaultValue: 0,
        validate: {
          min: 0,
          max: 3
        }
      },
      step: {
        type: DataTypes.INTEGER,
        comment: '备案审核流程:  0企业申请 1单位负责人审查 2县级公安机关主管民警审核 3县级公安机关主管领导审核',
        defaultValue: 0,
        validate: {
          min: 0,
          max: 3
        }
      },
      reason: {
        type: DataTypes.STRING(255),
        comment: '末次审批原因'
      },
      steps: {
        type: DataTypes.JSON,
        comment: '已通过备案信息'
      }
    },
    {
      tableName: 'audit',
      createdAt: 'crtime',
      updatedAt: 'moditime',
      deletedAt: false
    })

  return model
}
