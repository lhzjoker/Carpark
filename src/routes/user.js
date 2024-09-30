const router = require('koa-router')()
const { register, login, logout } = require('../controller/user')


router.prefix('/user')

/**
 * @swagger
 * /user/register:
 *   post:
 *     description: 注册
 *     tags: [用户模块]
 *     summary: 注册
 *     parameters:
 *       - name: userName
 *         description: 用户名
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: 密码
 *         in: formData
 *         required: true
 *         type: string
 *       - name: gender
 *         description: 性别
 *         in: formData
 *         required: false
 *         type: integer
 *       - name: avatar
 *         description: 头像地址
 *         in: formData
 *         required: false
 *         type: string
 *       - name: email
 *         description: 邮箱地址
 *         in: formData
 *         required: false
 *         type: string
 *     responses:
 *       400:
 *         description: 注册失败
 *       200:
 *         description: 注册成功
 *         schema:
 *           type: object
 *           properties:
 *             code:
 *               type: number
 *             msg:
 *               type: string
 *               description: 消息提示
 */
router.post('/register', async (ctx, next) => {
    const { userName, password, gender = 3, avatar = '', email = '' } = ctx.request.body
    
    ctx.body = await register({
        userName,
        password,
        gender,
        avatar,
        email
    })
})

/**
 * @swagger
 * /user/login:
 *   post:
 *     description: 登录
 *     tags: [用户模块]
 *     summary: 登录
 *     parameters:
 *       - name: userName
 *         description: 用户名
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: 密码
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       400:
 *         description: 登录失败
 *       401:
 *         description: 用户名或密码错误
 *       200:
 *         description: 登录成功
 *         schema:
 *           type: object
 *           properties:
 *             code:
 *               type: number
 *             msg:
 *               type: string
 *               description: 消息提示
 */
router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body
    ctx.body = await login(ctx, {
        userName,
        password
    })
})

/**
 * @swagger
 * /user/logout:
 *   post:
 *     description: 退出登录
 *     tags: [用户模块]
 *     summary: 退出登录
 *     responses:
 *       400:
 *         description: 退出登录失败
 *       200:
 *         description: 退出登录成功
 *         schema:
 *           type: object
 *           properties:
 *             code:
 *               type: number
 *             msg:
 *               type: string
 *               description: 消息提示
 */
router.post('/logout', async (ctx, next) => {
    ctx.body = await logout(ctx)
})

module.exports = router
