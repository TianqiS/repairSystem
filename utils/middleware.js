const errorList = require('../errorList.json');

exports.errorHandle = async function (ctx, next) {
  try {
    await next();
  } catch (error) {
    if (typeof error === 'number') {
      if ((error + '').length === 3) ctx.status = error;
      else {
        ctx.status = 400;
        ctx.body = {
          code: '-2',
          msg: errorList[error] //errorList.json.error
        };
      }
    } else {
      ctx.status = 500;
      ctx.body = {
        code: '-2',
        msg: '发生未知错误',
      }
    }
  }
}
