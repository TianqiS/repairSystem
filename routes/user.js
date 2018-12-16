const deviceModule = require('../module/device');
const router = require('koa-router')({
  prefix: '/user',
})

router.get('/repairmanInfo', async function(ctx, next) {
  const repairmanInfo = ctx.session.repairmanInfo;
  const devicesCount = (await deviceModule.getDevicesInfoByRepairmanId(repairmanInfo.staffId)).length;
  return ctx.body = {
    status: 'success',
    repairmanInfo: {
      ...repairmanInfo,
      devicesCount,
    },
  }
})

module.exports = router
