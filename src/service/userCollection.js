/**
 * @description 用户收藏 service
 */

const userCollection = require('../db/model/UserCollection')

async function createUserCollection({ carparkId, userId }) {
  const result = await userCollection.create({
    carparkId,
    userId,
    createTime: new Date(),
    updateTime: new Date(),
    isCancel: 0
  })
  return result.dataValues
}

async function cancelUserCollection({ collectionId }) {
  const result = await userCollection.update(
    { isCancel: 1, updateTime: new Date() },
    { where: { id: collectionId } }
  )
  return result[0]
}

async function getUserCollection({ userId }) {
  return userCollection.findAll({ where: { isCancel: 0, userId } })
}

async function getCollection({ carparkId, userId }) {
  return userCollection.findOne({ where: { isCancel: 0, carparkId, userId } })
}

module.exports = {
  createUserCollection,
  cancelUserCollection,
  getUserCollection,
  getCollection
}