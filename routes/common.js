const router = require('koa-router')({
  prefix: '/common',
})
const repairmanModule = require('../module/repairman');
const encryption = require('../utils/md5');

router.post('/repairmanLogin', async (ctx, next) => {
  const { phone, password } = ctx.request.body;
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

module.exports = router
