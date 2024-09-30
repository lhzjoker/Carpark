const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-session')
const { koaSwagger } = require('koa2-swagger-ui')

const swaggerRouter = require('./swagger/swagger')
const userRouter = require('./routes/user')
const carparkRouter = require('./routes/carpark')
const userCollectionRouter = require('./routes/userCollection')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// session
app.keys = ['sessionSecretKey$%#'];
app.use(session({
  key: 'carpark:sess',
  maxAge: 24 * 60 * 60 * 1000,
  httpOnly: true
}, app))

// swagger
app.use(koaSwagger({
  routePrefix: '/swagger',
  swaggerOptions: {
    url: '/swagger.json'
  }
}))

// routes
app.use(userRouter.routes(), userRouter.allowedMethods())
app.use(carparkRouter.routes(), carparkRouter.allowedMethods())
app.use(userCollectionRouter.routes(), userCollectionRouter.allowedMethods())
app.use(swaggerRouter.routes(), swaggerRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
