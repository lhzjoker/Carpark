/**
 * @description 用户收藏控制器
 */

const { createUserCollection, cancelUserCollection, getUserCollection, getCollection } = require('../service/userCollection')

async function collection({ carparkId, userId }) {
    if (!carparkId || !userId) return { code: 401, msg: "参数校验失败" }
    try {
        const result = await getCollection({ carparkId, userId })
        if (result) return { code: 402, msg: "已收藏，请勿重复点击" }
        await createUserCollection({ carparkId, userId })
        return { code: 200, msg: "收藏成功" }
    } catch (error) {
        console.error(error.message)
        return { code: 400, msg: "收藏失败" }
    }
}

async function cancelCollection({ collectionId }) {
    if (!collectionId) return { code: 401, msg: "参数校验失败" }
    try {
        const result = await cancelUserCollection({ collectionId })
        if (!result) return { code: 400, msg: "取消收藏失败" }
        return { code: 200, msg: "取消收藏成功" }
    } catch (error) {
        console.error(error.message)
        return { code: 400, msg: "取消收藏失败" }
    }
}

async function getCollectionList({ userId }) {
    if (!userId) return { code: 401, msg: "参数校验失败" }
    try {
        const result = await getUserCollection({ userId })
        return { code: 200, data: result, msg: "获取收藏列表成功" }
    } catch (error) {
        console.error(error.message)
        return { code: 400, msg: "获取收藏列表失败" }
    }
} 

module.exports = {
    collection,
    cancelCollection,
    getCollectionList
}