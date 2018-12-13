const router = require('koa-router')({
  prefix: '/users',
})

router.get('/repairmanInfo', async function(ctx, next) {
  const repairmanInfo = ctx.session.repairmanInfo;
  if(!repairmanInfo) throw 40003;
  return ctx.body = {
    status: 'success',
    repairmanInfo
  }
})

module.exports = router
