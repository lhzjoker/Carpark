/**
 * @description 用户收藏表
 */

const seq = require('../seq')
const User = require('./User')
const Carpark = require('./Carpark')
const { INTEGER, DATE } = require('sequelize')

const UserCollection = seq.define('UserCollection', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户id'
    },
    carparkId: {
        type: INTEGER,
        allowNull: false,
        comment: '停车库id'
    },
    createTime: {
        type: DATE,
        allowNull: false,
        comment: '收藏时间'
    },
    updateTime: {
        type: DATE,
        allowNull: false,
        comment: '更新时间'
    },
    isCancel: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '是否取消收藏 0:未取消 1:已取消'
    }
})

User.hasMany(UserCollection, { foreignKey: 'userId' })
UserCollection.belongsTo(User, { foreignKey: 'userId' })

Carpark.hasMany(UserCollection, { foreignKey: 'carparkId' })
UserCollection.belongsTo(Carpark, { foreignKey: 'carparkId' })

module.exports = UserCollection