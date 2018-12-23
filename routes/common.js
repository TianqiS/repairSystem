const router = require('koa-router')({
  prefix: '/common',
})
const repairmanModule = require('../module/repairman');
const adminModule = require('../module/admin');
const repairlogModule = require('../module/repairlog');
const deviceModule = require('../module/device');
const encryption = require('../utils/md5');

router.post('/repairmanLogin', async (ctx, next) => {
  const { phone, password } = ctx.request.body;
  if (!phone || !password) throw 40004;
  const repairmanInfo = (await repairmanModule.getRepairmanInfo({ phone }));
  const md5Password = encryption.b64_md5(password);
  if(md5Password === repairmanInfo.password) {
    delete repairmanInfo.password;
    ctx.session.repairmanInfo = repairmanInfo;
    ctx.session.userType = 'repairman';
    return ctx.body = {
      status: 'success',
      msg: repairmanInfo
    }
  }

  throw 40001;
})

router.post('/repairmanRegister', async function(ctx, next) {
  const {
    staffId,
    name,
    phone,
    password,
    unitInfo: unit_info,
    workAddress: work_address,
  } = ctx.request.body;

  await repairmanModule.addNewRepairman({
    staffId: staffId,
    name: name,
    phone: phone,
    password: encryption.b64_md5(password),
    unit_info: unit_info,
    work_address: work_address,
  })

  ctx.body = {
    status: 'success'
  }
})

router.post('/adminLogin', async function(ctx, next) {
  const {
    userName,
    password,
  } = ctx.request.body;

  const adminInfo = await adminModule.getAdminInfo(userName);
  if(password === adminInfo.password) {
    return ctx.body = {
      status: 'success',
      adminInfo,
      token: 'admin',
    }
  }
  throw 40001;
})

router.post('/repairInfo', async function(ctx, next) {
  const type = ctx.request.body.repairType;
  let repairInfo = ctx.request.body;
  let deviceInfo = {};
  if(type === 'deviceId') deviceInfo = await deviceModule.getDeviceInfo(repairInfo.deviceId);

  await repairlogModule.createLog({
    repair_time: new Date(),
    device_id: repairInfo.deviceId,
    detail: repairInfo.detail,
    user_id: 1,
    log_status: -1
  })

  return ctx.body = {
    status: 'success'
  }

})

module.exports = router
