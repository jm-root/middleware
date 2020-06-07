module.exports = function (model) {
  const { spu, region, danwei, renyuan, storehouse, storehouseSpu, alarm, flow, flowSpu, audit, companyBeian, renyuanBeian, storehouseBeian, checklist, checkrecord, abnomalBeian, tableLog, flowSpuCode, storehouseSpuCode } = model

  danwei.belongsTo(region, { constraints: false })
  danwei.belongsTo(danwei, { as: 'govern', constraints: false })
  danwei.hasMany(checkrecord, { constraints: false })
  danwei.belongsTo(companyBeian, { as: 'beian', constraints: false, foreignKey: 'id', targetKey: 'id' })

  renyuan.belongsTo(danwei, { constraints: false })
  renyuan.belongsTo(renyuanBeian, { as: 'beian', constraints: false })

  storehouse.belongsTo(region, { constraints: false })
  storehouse.belongsTo(danwei, { constraints: false })
  storehouse.belongsTo(danwei, { as: 'govern', constraints: false })
  storehouse.hasMany(storehouseSpu, { as: 'spus' })
  storehouse.hasMany(storehouseSpuCode, { as: 'spuCodes' })

  storehouseSpu.belongsTo(storehouse, { constraints: false })
  storehouseSpu.belongsTo(spu, { constraints: false })

  flow.belongsTo(storehouse, { constraints: false })
  flow.belongsTo(danwei, { constraints: false })
  flow.belongsTo(danwei, { as: 'tradeDanwei', constraints: false })
  flow.belongsTo(renyuan, { constraints: false })
  flow.belongsTo(renyuan, { as: 'tradeRenyuan', constraints: false })
  flow.belongsTo(renyuan, { as: 'baUser', constraints: false })
  flow.hasMany(flowSpu, { as: 'spus' })
  flow.hasMany(flowSpuCode, { as: 'spuCodes' })
  flow.belongsTo(alarm, { constraints: false })
  flow.belongsTo(abnomalBeian, { constraints: false })

  flowSpu.belongsTo(flow, { constraints: false })
  flowSpu.belongsTo(spu, { constraints: false })

  companyBeian.belongsTo(region, { constraints: false })
  companyBeian.belongsTo(danwei, { as: 'govern', constraints: false })
  companyBeian.belongsTo(audit, { constraints: false })
  companyBeian.belongsTo(audit, { as: 'okAudit', constraints: false })
  companyBeian.belongsTo(renyuan, { as: 'baUser', constraints: false })

  renyuanBeian.belongsTo(danwei, { constraints: false })
  renyuanBeian.belongsTo(audit, { constraints: false })
  renyuanBeian.belongsTo(audit, { as: 'okAudit', constraints: false })
  renyuanBeian.belongsTo(renyuan, { as: 'baUser', constraints: false })

  storehouseBeian.belongsTo(region, { constraints: false })
  storehouseBeian.belongsTo(danwei, { as: 'govern', constraints: false })
  storehouseBeian.belongsTo(danwei, { constraints: false })
  storehouseBeian.belongsTo(audit, { constraints: false })
  storehouseBeian.belongsTo(audit, { as: 'okAudit', constraints: false })
  storehouseBeian.belongsTo(renyuan, { as: 'baUser', constraints: false })

  checklist.belongsTo(danwei, { constraints: false })

  checkrecord.belongsTo(danwei, { constraints: false })
  checkrecord.belongsTo(danwei, { as: 'govern', constraints: false })
  checkrecord.belongsTo(renyuan, { constraints: false })

  abnomalBeian.belongsTo(danwei, { constraints: false })
  abnomalBeian.belongsTo(danwei, { as: 'tradeDanwei', constraints: false })
  abnomalBeian.belongsTo(storehouse, { constraints: false })
  abnomalBeian.belongsTo(storehouse, { as: 'tradeStorehouse', constraints: false })
  abnomalBeian.belongsTo(renyuan, { constraints: false })
  abnomalBeian.belongsTo(renyuan, { as: 'tradeRenyuan', constraints: false })
  abnomalBeian.belongsTo(renyuan, { as: 'baUser', constraints: false })
  abnomalBeian.belongsTo(audit, { constraints: false })

  alarm.belongsTo(danwei, { constraints: false })
  alarm.belongsTo(renyuan, { constraints: false })

  tableLog.belongsTo(renyuan, { as: 'user', constraints: false })

  flowSpuCode.belongsTo(flow, { constraints: false })
  flowSpuCode.belongsTo(spu, { constraints: false })

  storehouseSpuCode.belongsTo(storehouse, { constraints: false })
  storehouseSpuCode.belongsTo(spu, { constraints: false })
}
