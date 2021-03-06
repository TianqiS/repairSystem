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
  let repairmanId = '';
  if(repairmanName) repairmanId = (await repairmanModule.getRepairmanInfo({
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

router.post('/editDevice', async function(ctx, next) {
  const {
    deviceId,
    deviceType,
    useUnit,
    producer,
    serialNumber,
    location,
    repairmanName,
    status
  } = ctx.request.body;
  console.log(status);
  let repairmanId;
  let deviceInfo = {
    device_type: deviceType,
    use_unit: useUnit,
    producer: producer,
    serial_number: serialNumber,
    location,
    status
  };
  if(repairmanName) {
    repairmanId = (await repairmanModule.getRepairmanInfo({
      name: repairmanName
    })).staff_id;
    deviceInfo.repairman_id = repairmanId;
  }
  if(repairmanName === "") deviceInfo.repairman_id = "";
  await deviceModule.updateDeviceInfo(deviceId, deviceInfo);

  return ctx.body = {
    status: 'success'
  }

})

router.post('/setRepairman', async function(ctx, next) {
  const {
    logId,
    repairmanName,
    deviceId
  } = ctx.request.body;
  console.log(ctx.body)

  const repairmanId = (await repairmanModule.getRepairmanInfo({
    name: repairmanName
  })).staff_id;

  await deviceModule.updateDeviceInfo(deviceId,{
    repairman_id: repairmanId
  });
  await repairlogModule.updateRepairlog(logId, {
    repairman_id: repairmanId
  });

  return ctx.body =  {
    status: 'success'
  }
})

router.post('/deleteRepairlog', async function(ctx, next) {
  const { logId } = ctx.request.body;
  await repairlogModule.deleteRepairlog(logId)

  return ctx.body = {
    status: 'success'
  }
})

router.post('/deleteDevice', async function(ctx, next) {
  const { deviceId } = ctx.request.body;
  await deviceModule.deleteDevice(deviceId);

  return ctx.body = {
    status: 'success'
  }
})


module.exports = router