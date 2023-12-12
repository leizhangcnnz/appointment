const Router = require('koa-router')
const router = new Router()
const { login, register } = require('../controllers/user')

// root
router.post('/login', login) // 登录
router.get('/login', login)
router.post('/register', register) // 注册

module.exports = router
