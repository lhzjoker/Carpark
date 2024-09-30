const router = require('koa-router')()
const multer = require('koa-multer')
const { importData, getFree, getNight, getHeight } = require('../controller/carpark')

// multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/public')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
const upload = multer({ storage });

router.prefix('/carpark')

/**
 * @swagger
 * /carpark/importCarpark:
 *   post:
 *     description: 导入停车场数据
 *     tags: [停车场模块]
 *     summary: 导入停车场数据
 *     parameters:
 *       - name: file
 *         description: 文件
 *         in: formData
 *         required: true
 *         type: file
 *     responses:
 *       400:
 *         description: 导入数据错误
 *       401:
 *         description: 请上传文件
 *       402:
 *         description: 导入数据失败
 *       200:
 *         description: 导入数据成功
 *         schema:
 *           type: object
 *           properties:
 *             code:
 *               type: number
 *             msg:
 *               type: string
 *               description: 消息提示
 */
router.post('/importCarpark', upload.single('file'), async (ctx, next) => {
    ctx.body = await importData(ctx.req.file)
})

/**
 * @swagger
 * /carpark/getFreeCarpark:
 *   get:
 *     description: 获取免费停车场列表
 *     tags: [停车场模块]
 *     summary: 获取免费停车场列表
 *     parameters:
 *       - name: page
 *         description: 页码
 *         in: query
 *         required: false
 *         type: integer
 *       - name: size
 *         description: 每页数量
 *         in: query
 *         required: false
 *         type: integer
 *     responses:
 *       400:
 *         description: 获取免费停车场列表失败
 *       200:
 *         description: 获取免费停车场列表成功
 *         schema:
 *           type: object
 *           properties:
 *             code:
 *               type: number
 *             data:
 *               type: array
 *               description: 免费停车场列表
 *             count:
 *               type: number
 *               description: 总数
 *             msg:
 *               type: string
 *               description: 消息提示
 */
router.get('/getFreeCarpark', async (ctx, next) => {
    const { page = 1, size = 10 } = ctx.request.query
    ctx.body = await getFree({ page: +page, size: +size })
})

/**
 * @swagger
 * /carpark/getNightCarpark:
 *   get:
 *     description: 获取夜间停车场列表
 *     tags: [停车场模块]
 *     summary: 获取夜间停车场列表
 *     parameters:
 *       - name: page
 *         description: 页码
 *         in: query
 *         required: false
 *         type: integer
 *       - name: size
 *         description: 每页数量
 *         in: query
 *         required: false
 *         type: integer
 *     responses:
 *       400:
 *         description: 获取夜间停车场列表失败
 *       200:
 *         description: 获取夜间停车场列表成功
 *         schema:
 *           type: object
 *           properties:
 *             code:
 *               type: number
 *             data:
 *               type: array
 *               description: 夜间停车场列表
 *             count:
 *               type: number
 *               description: 总数
 *             msg:
 *               type: string
 *               description: 消息提示
 */
router.get('/getNightCarpark', async (ctx, next) => {
    const { page = 1, size = 10 } = ctx.request.query
    ctx.body = await getNight({ page: +page, size: +size })
})

/**
 * @swagger
 * /carpark/getHeightCarpark:
 *   get:
 *     description: 获取满足高度要求停车场列表
 *     tags: [停车场模块]
 *     summary: 获取满足高度要求停车场列表
 *     parameters:
 *       - name: page
 *         description: 页码
 *         in: query
 *         required: false
 *         type: integer
 *       - name: size
 *         description: 每页数量
 *         in: query
 *         required: false
 *         type: integer
 *       - name: height
 *         description: 高度
 *         in: query
 *         required: true
 *         type: double
 *     responses:
 *       400:
 *         description: 获取满足高度要求停车场列表失败
 *       401:
 *          description: 参数校验失败
 *       200:
 *         description: 获取满足高度要求停车场列表成功
 *         schema:
 *           type: object
 *           properties:
 *             code:
 *               type: number
 *             data:
 *               type: array
 *               description: 满足高度要求停车场列表
 *             count:
 *               type: number
 *               description: 总数
 *             msg:
 *               type: string
 *               description: 消息提示
 */
router.get('/getHeightCarpark', async (ctx, next) => {
    const { height, page = 1, size = 10 } = ctx.request.query
    ctx.body = await getHeight({ height, page: +page, size: +size })
})

module.exports = router
