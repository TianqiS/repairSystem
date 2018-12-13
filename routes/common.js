const router = require('koa-router')({
  prefix: '/common',
})
const repairemanModule = require('../module/repaireman');
const encryption = require('../utils/md5');

router.post('/repairmanLogin', async (ctx, next) => {
  const { phone, password } = ctx.request.body;
  const repairemanInfo = (await repairemanModule.getRepairemanInfo({ phone }));
  const md5Password = encryption.b64_md5(password);
  if(md5Password === repairemanInfo.password) {
    delete repairemanInfo.password;
    return ctx.body = {
      status: 'success',
      msg: repairemanInfo
    }
  }

  throw 40001;
})

router.post('/repairemaRegister', async function(ctx, next) {
  const {
    staffId,
    name,
    phone,
    password,
    unitInfo: unit_info,
    workAddress: work_address,
  } = ctx.request.body;

  await repairemanModule.addNewRepaireman({
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
