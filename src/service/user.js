/**
 * @description 用户模块 service
 */
const crypto = require('crypto')
const User = require("../db/model/User")
const secretKey = 'wasd:,1.#$%&*'

async function createUser({ userName, password, gender = 3, email, avatar }) {
    const str = `password${password}secretKey${secretKey}`
    const pass = crypto.createHash('md5').update(str).digest("hex")
    const result = await User.create({
        userName,
        password: pass,
        gender,
        email,
        avatar
    })
    return result.dataValues
}

async function getUser({ userName, password }) {
    const str = `password${password}secretKey${secretKey}`
    const pass = crypto.createHash('md5').update(str).digest("hex")
    const result = await User.findOne({
        attributes: ['userName', 'gender', 'avatar', 'email'],
        where: { userName, password: pass }
    })
    return result
}

module.exports = {
    createUser,
    getUser
}