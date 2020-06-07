module.exports = function (sequelize, DataTypes) {
  const model = sequelize.define('danwei',
    {
      id: {
        type: DataTypes.STRING(50),
        primaryKey: true
      },
      nId: {
        type: DataTypes.INTEGER,
        unique: true,
        comment: '自增id'
      },
      code: {
        type: DataTypes.STRING(40),
        allowNull: false,
        comment: '单位统一社会信用代码/公安机关机构代码'
      },
      name: {
        type: DataTypes.STRING(300),
        allowNull: false,
        defaultValue: '',
        comment: '名称'
      },
      address: {
        type: DataTypes.STRING(300),
        comment: '地址'
      },
      isGovern: {
        type: DataTypes.INTEGER,
        comment: '是否公安机关'
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
      }
    },
    {
      tableName: 'danwei',
      createdAt: 'crtime',
      updatedAt: 'moditime',
      deletedAt: 'deltime'
    })

  return model
}
