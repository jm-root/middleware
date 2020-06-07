module.exports = function (sequelize, DataTypes) {
  const model = sequelize.define('companyBeian',
    {
      id: {
        type: DataTypes.STRING(50),
        primaryKey: true
      },
      code: {
        type: DataTypes.STRING(40),
        allowNull: false,
        comment: '单位统一社会信用代码/公安机关机构代码'
      },
      type: {
        type: DataTypes.STRING(2),
        comment: '单位类型：KF、SC、CC、YS、SY、XS、CZ等'
      },
      name: {
        type: DataTypes.STRING(300),
        comment: '名称'
      },
      info: {
        type: DataTypes.JSON,
        comment: '备案信息'
      },
      okInfo: {
        type: DataTypes.JSON,
        comment: '已通过备案信息'
      },
      version: {
        type: DataTypes.INTEGER,
        comment: '版本',
        defaultValue: 0,
        validate: {
          min: 0
        }
      },
      governCode: {
        type: DataTypes.STRING(40),
        comment: '管辖公安机关机构代码',
        allowNull: false
      },
      governName: {
        type: DataTypes.STRING(250),
        comment: '管辖公安机关名称',
        allowNull: false
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        comment: '是否有效 0无效 1有效'
      },
      score: {
        type: DataTypes.INTEGER,
        defaultValue: 100,
        comment: '得分,范围(0~100)'
      }
    },
    {
      tableName: 'company_beian',
      createdAt: 'crtime',
      updatedAt: 'moditime',
      deletedAt: 'deltime'
    })

  return model
}
