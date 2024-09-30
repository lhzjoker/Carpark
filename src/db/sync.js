/**
 * @description: 数据库测试连接和同步
 */
const seq = require('./seq')

require('./model/Carpark')
require('./model/User')
require('./model/UserCollection')

// 测试连接
seq.authenticate().then(() => {
    console.log('auth ok')
}).catch(() => {
    console.log('auth err')
})

// 执行同步
seq.sync({ force: true }).then(() => {
    console.log('sync ok')
    process.exit()
}).catch((err) => {
    console.log('sync err', err.message)
})