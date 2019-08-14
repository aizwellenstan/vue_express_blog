module.exports = app => {
    const express = require('express')
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const router = express.Router({
        mergeParams: true
    })
    const User = require('../models/User')
    const Article = require('../models/Article')
// 引入权限管理中间件
const authMiddleware = require('../middleware/auth')
    // 注册用户
    router.post('/register', async (req, res) => {
        const {
            username,
            password
        } = req.body//req.body，app需使用中间件express.json
        // 1. 根据用户名找用户,判断用户是否存在
        const user = await User.findOne({
            username
        })
        assert(!user, 422, '用户已存在')
        // 2. 存储
        const model = await User.create({
            username,
            password
        }) 
        res.send(model)
    })

    // login, 验证登录
    router.post('/login', async (req, res) => {
        const {
            username,
            password
        } = req.body
        assert(username && password, 422, '用户或密码不能为空')
        // 1. 根据用户名找用户
        const user = await User.findOne({
            username
        }).select('+password')
        assert(user, 422, '用户不存在')
        // 2. 校验密码
        const isValid = require('bcrypt').compareSync(password, user.password)
        assert(isValid, 422, '密码错误')
        // 3. 返回token
        const token = jwt.sign({
            _id: user._id,
            username: user.username
        }, app.get('secret'))
        res.send({
            token
        })
    })
    router.get('/userinfo', authMiddleware(), async (req, res)=> {
        const user = req.user
        res.send(user)
    })
    router.get('/articles', authMiddleware(), async (req, res) => {
        const data = await Article.find({author: req.user._id}).populate('author')
        res.send(data)
    })
    app.use('/blog/api',router)
    // error handle
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}