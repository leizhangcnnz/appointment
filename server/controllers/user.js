const Joi = require('joi')
const axios = require('axios')
const PSW = require('../utils/password')
const DOMParser = require('dom-parser')
const { GITHUB } = require('../config')
var fs = require('fs')
const { decodeQuery } = require('../utils')
const { comparePassword, encrypt } = require('../utils/bcrypt')
const { createToken } = require('../utils/token')

const { user: UserModel, comment: CommentModel, reply: ReplyModel, ip: IpModel, sequelize } = require('../models')
const func = require('joi/lib/types/func')
const DomParser = require('dom-parser')
const qs = require("qs");

const USER_DOMAIN = 'http://spring-oauth-server:54188'

class UserController {

  // 登录
  static async login(ctx) {
    const validator = ctx.validate(ctx.request.body, {
      account: Joi.string().required(),
      password: Joi.string(),
    })
    if (validator) {
      const { account, password } = ctx.request.body

      const data = {
        grant_type: 'authorization_password',
        username: account,
        password: password,
        scope: 'all'
      }
      const basicAuth = {
        username: 'trader_client',
        password: 'Trader_client_password'
      }
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      const result = await axios({
        method: 'post',
        url: `${USER_DOMAIN}/oauth2/token`,
        headers: headers,
        data: qs.stringify(data),
        auth: basicAuth
      }).catch(error => {
        ctx.throw(401, '登陆不成功，请确认用户名和密码')
      })

      const token = result.data.access_token

      const user = await axios({
        method: 'get',
        url: `${USER_DOMAIN}/users`,
        headers: {Authorization: `Bearer ${token}`}
      })

      // ctx.body = { username: 'leizhangcnnz', role: 1, userId: '1', token: 'abc', email: 'email@gmai.com' }
      ctx.body = { ...user.data.data, token }
    }
  }

  // 注册
  static async register(ctx) {
    const validator = ctx.validate(ctx.request.body, {
      username: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().email().required(),
    })

    if (validator) {
      // ctx.client(200, '注册成功')
      ctx.status = 204
      ctx.body = { status: 204 }
    }
  }
}

module.exports = UserController
