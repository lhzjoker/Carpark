/**
 * @description: 用户控制器
 */
const { createUser, getUser } = require('../service/user')

async function register({ userName, password, gender, avatar, email }) {
    try {
        await createUser({ userName, password, gender, avatar, email })
        return { code: 200, msg: "注册成功" }
    } catch (error) {
        console.error(error.message)
        return { code: 400, msg: "注册失败" }
    }
}

async function login(ctx, { userName, password }) {
    try {
        const result = await getUser({ userName, password })
        if(!result) return { code: 401, msg: "用户名或密码错误" }
        ctx.session.userInfo = result
        return { code: 200, msg: "登录成功" }
    } catch (error) {
        console.error(error.message)
        return { code: 400, msg: "登录失败" }
    }
}

async function logout(ctx) {
    try {
        delete ctx.session.userInfo
        return { code: 200, msg: "退出登录成功" }
    } catch (error) {
        console.error(error.message)
        return { code: 400, msg: "退出登录失败" }
    }
}

module.exports = {
  register,
  login,
  logout
}
