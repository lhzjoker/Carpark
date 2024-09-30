/**
 * @description 用户表
 */

const seq = require('../seq')
const { STRING, DECIMAL } = require('sequelize')

const User = seq.define('User', {
    userName: {
        type: STRING,
        allowNull: false,
        comment: '用户名'
    },
    password: {
        type: STRING,
        allowNull: false,
        comment: '密码'
    },
    gender: {
        type: DECIMAL,
        allowNull: false,
        defaultValue: 3,
        comment: '性别 1 男 2 女 3 保密'
    },
    avatar: {
        type: STRING,
        comment: '头像'
    },
    email: {
        type: STRING,
        comment: '邮箱'
    }
})

module.exports = User