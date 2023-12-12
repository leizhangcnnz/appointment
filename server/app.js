const Koa = require('koa')
const koaBody = require('koa-body')
const cors = require('koa2-cors')
const error = require('koa-json-error')
const logger = require('koa-logger')

//  config
const config = require('./config')

const loadRouter = require('./router')

// app...
const app = new Koa()
// context binding...
const context = require('./utils/context')
Object.keys(context).forEach(key => {
  app.context[key] = context[key] // 绑定上下文对象
})

app
  .use(cors())
  .use(
    koaBody({
      multipart: true,
      formidable: {
        // uploadDir: path.resolve(__dirname, './upload'),
        keepExtensions: true, // 保持文件的后缀
        maxFileSize: 2000 * 1024 * 1024 // 设置上传文件大小最大限制，默认20M
      }
    })
  )
  .use(
    error({
      postFormat: (e, { stack, ...rest }) => (process.env.NODE_ENV !== 'development' ? rest : { stack, ...rest })
    })
  )
  .use(logger())

loadRouter(app)

app.listen(config.PORT, () => {
  console.log(`sever listen on http://127.0.0.1:${config.PORT}`)
})
