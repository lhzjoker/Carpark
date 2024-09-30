/**
 * @description: 停车场控制器
 */

const { importCarparkData, getFreeCarpark, getNightCarpark, getHeightCarpark } = require('../service/carpark')

async function getFree({ page, size }) {
    try {
        const { count, result } = await getFreeCarpark({ page, size })
        return { code: 200, data: result, count, msg: "获取免费停车场成功" }
    } catch (error) {
        console.error(error.message)
        return { code: 400, msg: "获取免费停车场失败" }
    }
}

async function getNight({ page, size }) {
    try {
        const { count, result } = await getNightCarpark({ page, size })
        return { code: 200, data: result, count, msg: "获取夜间停车场成功" }
    } catch (error) {
        console.error(error.message)
        return { code: 400, msg: "获取夜间停车场失败" }
    }
}

async function getHeight({ page, size, height }) {
    if (!height) return { code: 401, msg: "参数校验失败" }
    try {
        const { count, result } = await getHeightCarpark({ page, size, height })
        return { code: 200, data: result, count, msg: "获取满足高度要求停车场成功" }
    } catch (error) {
        console.error(error.message)
        return { code: 400, msg: "获取满足高度要求停车场失败" }
    }
}

async function importData(file) {
    if (!file) return { code: 401, msg: "请上传文件" }
    try {
        const result = await importCarparkData(file)
        if (!result) return { code: 402, msg: "导入数据失败" }
        return { code: 200, msg: "导入数据成功" }
    } catch (error) {
        console.error(error.message)
        return { code: 400, msg: "导入数据错误" }
    }
}

module.exports = {
    importData,
    getFree,
    getNight,
    getHeight
}