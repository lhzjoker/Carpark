const router = require('koa-router')()
const { collection, cancelCollection, getCollectionList } = require('../controller/userCollection')


router.prefix('/userCollection')

/**
 * @swagger
 * /userCollection/collection:
 *   post:
 *     description: 收藏停车场
 *     tags: [用户收藏模块]
 *     summary: 收藏停车场
 *     parameters:
 *       - name: carparkId
 *         description: 停车场id
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: userId
 *         description: 用户id
 *         in: formData
 *         required: true
 *         type: integer
 *     responses:
 *       400:
 *         description: 收藏失败
 *       401:
 *         description: 参数校验失败
 *       402:
 *         description: 已收藏过该停车场
 *       200:
 *         description: 收藏成功
 *         schema:
 *           type: object
 *           properties:
 *             code:
 *               type: number
 *             msg:
 *               type: string
 *               description: 消息提示
 */
router.post('/collection', async (ctx, next) => {
    const { carparkId, userId } = ctx.request.body
    
    ctx.body = await collection({
        carparkId,
        userId
    })
})

/**
 * @swagger
 * /userCollection/cacelCollection:
 *   post:
 *     description: 取消收藏停车场
 *     tags: [用户收藏模块]
 *     summary: 取消收藏停车场
 *     parameters:
 *       - name: collectionId
 *         description: 收藏id
 *         in: formData
 *         required: true
 *         type: integer
 *     responses:
 *       400:
 *         description: 取消收藏失败
 *       401:
 *         description: 参数校验失败
 *       200:
 *         description: 取消收藏成功
 *         schema:
 *           type: object
 *           properties:
 *             code:
 *               type: number
 *             msg:
 *               type: string
 *               description: 消息提示
 */
router.post('/cacelCollection', async (ctx, next) => {
    const { collectionId } = ctx.request.body
    ctx.body = await cancelCollection({
        collectionId
    })
})

/**
 * @swagger
 * /userCollection/getCollection:
 *   get:
 *     description: 用户获取收藏列表
 *     tags: [用户收藏模块]
 *     summary: 用户获取收藏列表
 *     parameters:
 *       - name: userId
 *         description: 用户id
 *         in: query
 *         required: true
 *         type: integer
 *     responses:
 *       400:
 *         description: 获取收藏列表失败
 *       401:
 *         description: 参数校验失败
 *       200:
 *         description: 获取收藏列表成功
 *         schema:
 *           type: object
 *           properties:
 *             code:
 *               type: number
 *             data:
 *               type: array
 *               description: 收藏列表
 *             msg:
 *               type: string
 *               description: 消息提示
 */
router.get('/getCollection', async (ctx, next) => {
    const { userId } = ctx.request.query
    ctx.body = await getCollectionList({
        userId
    })
})


module.exports = router
