const deviceModule = require('../module/device');
const moment  = require('moment');
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

router.get('/devicesInfo', async function(ctx, next) {
  const repairmanStaffId = ctx.session.repairmanInfo.staffId;
  const devicesInfo = await deviceModule.getDevicesInfoByRepairmanId(repairmanStaffId);

  return ctx.body = {
    status: 'success',
    devicesInfo,
  }
})

router.get('/specialDevice', async function(ctx, next) {
  const deviceId = ctx.request.query.deviceId;
  const deviceInfo = await deviceModule.getDeviceInfo(deviceId);
  deviceInfo.update_time = moment(deviceInfo.update_time.getTime()).format('YYYY-MM-DD HH:mm:ss');

  return ctx.body = {
    status: 'success',
    deviceInfo,
  }
})

module.exports = router
