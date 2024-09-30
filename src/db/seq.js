/**
 * @description 创建sequelize实例
 */

const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('./conf')

const { host, user, password, database } = MYSQL_CONF
const conf = {
    host,
    dialect: 'mysql'
}

const seq = new Sequelize(database, user, password, conf)

module.exports = seq