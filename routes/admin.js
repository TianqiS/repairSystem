const repairlogModule = require('../module/repairlog');
const repairmanModule = require('../module/repairman');
const deviceModule = require('../module/device');
const router = require('koa-router')({
  prefix: '/admin',
})

router.get('/repairList', async function(ctx, next) {
  const {
    page = 1,
    perPage = 10
  } = ctx.request.body;

  const list = await repairlogModule.getRepairlogList(page, perPage);
  return ctx.body = {
    status: 'success',
    list,
  }
})

router.get('/repairmanList', async function(ctx, next) {
  const repairmanList = await repairmanModule.getRepairmanList();

  return ctx.body = {
    status: 'success',
    repairmanList,
  }
})

router.post('/device', async function(ctx, next) {
  const {
    deviceId,
    deviceType,
    useUnit,
    producer,
    serialNumber,
    location,
    repairmanName
  } = ctx.request.body;

  const repairmanId = (await repairmanModule.getRepairmanInfo({
    name: repairmanName
  })).staff_id;
  await deviceModule.createNewDevice({
    id: deviceId,
    device_type: deviceType,
    use_unit: useUnit,
    producer: producer,
    serial_number: serialNumber,
    location,
    repairman_id: repairmanId,
    status: 1,
    update_time: new Date()
  })
  return ctx.body = {
    status: 'success'
  }
})

router.get('/deviceList', async function(ctx, next) {
  const list = await deviceModule.getDeviceInfoList();

  return ctx.body = {
    status: 'success',
    list
  }
})

module.exports = router