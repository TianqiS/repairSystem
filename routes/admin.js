const repairlogModule = require('../module/repairlog');
const repairmanModule = require('../module/repairman');
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

module.exports = router