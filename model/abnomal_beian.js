module.exports = function (sequelize, DataTypes) {
  const model = sequelize.define('abnomalBeian',
    {
      id: {
        type: DataTypes.STRING(50),
        primaryKey: true
      },
      type: {
        type: DataTypes.STRING(10),
        comment: '类型 ZR转让 DSBD丢失被盗 TYTC停业停产',
        allowNull: false
      },
      time: {
        type: DataTypes.DATE,
        comment: '日期'
      },
      info: {
        type: DataTypes.JSON,
        comment: '附加信息'
      }
    },
    {
      tableName: 'abnomal_beian',
      createdAt: 'crtime',
      updatedAt: 'moditime',
      deletedAt: 'deltime',
      comment: '异常备案'
    })

  return model
}
