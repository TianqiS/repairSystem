const router = require('koa-router')({
  prefix: '/common',
})
const repairemanModule = require('../module/repaireman');
const encryption = require('../utils/md5');

router.post('/repairemanLogin', async (ctx, next) => {
  const { phone, password } = ctx.request.body;
  const repairemanPassword = (await repairemanModule.getRepairemanInfo({ phone })).password;
  const md5Password = encryption.b64_md5(password);
  if(md5Password === repairemanPassword) {
    return ctx.body = {
      status: 'success'
    }
  }

  throw 40001;
})

router.post('/repairemanRegister', async function(ctx, next) {
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
