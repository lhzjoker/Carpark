/**
 * @description 停车场表
 */

const seq = require('../seq')
const { INTEGER, DOUBLE, STRING } = require('sequelize')

const Carpark = seq.define('Carpark', {
    car_park_no: {
        type: STRING,
        allowNull: false,
        unique: true,
        comment: '停车场编号，唯一'
    },
    address: {
        type: STRING,
        allowNull: false,
        comment: '停车场地址'
    },
    x_coord: {
        type: STRING,
        allowNull: false,
        comment: 'x坐标'
    },
    y_coord: {
        type: STRING,
        allowNull: false,
        comment: 'y坐标'
    },
    car_park_type: {
        type: STRING,
        allowNull: false,
        comment: '停车场类型'
    },
    type_of_parking_system: {
        type: STRING,
        allowNull: false,
        comment: '停车系统类型'
    },
    short_term_parking: {
        type: STRING,
        allowNull: false,
        comment: '短期停车'
    },
    free_parking: {
        type: STRING,
        allowNull: false,
        comment: '免费停车时间'
    },
    night_parking: {
        type: STRING,
        allowNull: false,
        comment: '是否有夜间停车'
    },
    car_park_decks: {
        type: INTEGER,
        allowNull: false,
        comment: '停车场层数'
    },
    gantry_height: {
        type: DOUBLE,
        allowNull: false,
        comment: '限制高度'
    },
    car_park_basement: {
        type: STRING,
        allowNull: false,
        comment: '是否为地下停车场'
    }
})

module.exports = Carpark