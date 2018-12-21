const deviceModule = require('../module/device');
const repairlogModule = require('../module/repairlog');
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

  return ctx.body = {
    status: 'success',
    deviceInfo,
  }
})

router.get('/deviceRepairLog', async function(ctx, next) {
  const repairmanId = ctx.session.repairmanInfo.staffId;
  const deviceId = ctx.request.query.deviceId;

  let repairLogs = await repairlogModule.getDeviceRepairlog(repairmanId, deviceId);
  return ctx.body = {
    status: 'success',
    repairLogs,
  }
})

router.get('/specialRepairLog', async function(ctx, next) {
  const logId = ctx.request.query.logId;
  const logDetail = await repairlogModule.getSpecialLog(logId);
  return ctx.body = {
    status: 'success',
    logDetail
  }
})

module.exports = router
