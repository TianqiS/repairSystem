const Koa = require('koa')
const cors = require('koa2-cors')
const app = new Koa()
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const middleware = require('./utils/middleware');

const common = require('./routes/common')
const users = require('./routes/users')

// error handler
app.use(middleware.errorHandle);

app.use(cors());
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(middleware.koaSession({
  key: 'repairSystem'
}))
app.use(json())
app.use(logger())
// app.use(require('koa-static')(__dirname + '/public'))


// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(common.routes(), common.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
