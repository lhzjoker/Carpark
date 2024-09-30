/**
 * @description 停车场模块service
 */
const fs = require('fs')
const csvParser = require('csv-parser')
const Carpark = require('../db/model/Carpark')
const seq = require('../db/seq')
const { Op } = require('sequelize')

function parseCSV(file) {
    return new Promise((resolve, reject) => {
        const results = []
        fs.createReadStream(file.path)
            .pipe(csvParser())
            .on('data', (row) => {
                results.push(row)
            })
            .on('end', () => {
                resolve(results)
            })
            .on('error', (error) => {
                reject(error)
            })
    })
}

async function importCarparkData(file) {
    const transaction = await seq.transaction()
    try {
        const data = await parseCSV(file)
        await Carpark.bulkCreate(data, { transaction })
        await transaction.commit()
        console.log('import successfully')
        return true
    } catch (error) {
        await transaction.rollback()
        console.error('import failed', error)
        return false
    }
}

async function getFreeCarpark({ page, size }) {
    const count = await Carpark.count({ where: { free_parking: { [Op.ne]: 'No' } } })
    const result = await Carpark.findAll({
        limit: size,
        offset: (page - 1) * size,
        where: { free_parking: { [Op.ne]: 'No' } },
        order: [['createdAt', 'DESC']]
    })
    return { count, result }
}

async function getNightCarpark({ page, size }) {
    const count = await Carpark.count({ where: { night_parking: 'YES' } })
    const result = await Carpark.findAll({
        limit: size,
        offset: (page - 1) * size,
        where: { night_parking: 'YES' },
        order: [['createdAt', 'DESC']]
    })
    return { count, result }
}

async function getHeightCarpark({ page, size, height }) {
    const count = await Carpark.count({ where: { gantry_height: { [Op.gte]: height } } })
    const result = await Carpark.findAll({
        limit: size,
        offset: (page - 1) * size,
        where: { gantry_height: { [Op.gte]: height } },
        order: [['createdAt', 'DESC']]
    })
    return { count, result }
}

module.exports = {
    parseCSV,
    importCarparkData,
    getFreeCarpark,
    getNightCarpark,
    getHeightCarpark
}